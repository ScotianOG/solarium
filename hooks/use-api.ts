/**
 * Hook for API data fetching with caching, error handling, and loading states
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAppContext, actions, ActionType } from '@/lib/state/app-context';
import { ApiError, ApiErrorType } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';

// Cache for storing API responses
const API_CACHE: Record<string, {
  data: any;
  timestamp: number;
  error?: any;
}> = {};

// Default cache time (5 minutes)
const DEFAULT_CACHE_TIME = 5 * 60 * 1000;

interface UseApiOptions<T> {
  // Unique cache key for this request
  cacheKey?: string;
  
  // How long to cache this request in milliseconds
  cacheTime?: number;
  
  // Whether to skip the request (e.g., conditional fetching)
  skip?: boolean;
  
  // Whether to use cached data while fetching
  useCachedData?: boolean;
  
  // Error handling options
  errorHandling?: {
    // Show toast notification on error
    showToast?: boolean;
    
    // Custom title for error toast
    toastTitle?: string;
    
    // Whether to throw the error (otherwise it's returned in the hook result)
    throw?: boolean;
  };
  
  // Transform function to apply to the data
  transform?: (data: any) => T;
  
  // Dependencies array for refetching (similar to useEffect dependencies)
  deps?: any[];
}

interface UseApiResult<T> {
  // The fetched data (or cached data)
  data: T | null;
  
  // Loading state for the request
  isLoading: boolean;
  
  // Error state for the request
  error: ApiError | Error | null;
  
  // Whether data is currently being refreshed (but we have cached data)
  isRefreshing: boolean;
  
  // Whether the API request was successful
  isSuccess: boolean;
  
  // Manually refetch the data
  refetch: () => Promise<T>;
  
  // Clear the cache for this request
  clearCache: () => void;
}

export function useApi<T = any>(
  fetchFn: () => Promise<T>,
  options: UseApiOptions<T> = {}
): UseApiResult<T> {
  const {
    cacheKey,
    cacheTime = DEFAULT_CACHE_TIME,
    skip = false,
    useCachedData = true,
    errorHandling = {
      showToast: true,
      throw: false,
    },
    transform,
    deps = [],
  } = options;

  const { toast } = useToast();
  const { dispatch } = useAppContext();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<ApiError | Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Use ref for the fetch function to avoid unnecessary rerenders
  const fetchFnRef = useRef(fetchFn);
  fetchFnRef.current = fetchFn;
  
  // Use ref for the options to avoid unnecessary rerenders
  const optionsRef = useRef(options);
  optionsRef.current = options;

  /**
   * Clear the cache for this request
   */
  const clearCache = useCallback(() => {
    if (cacheKey) {
      delete API_CACHE[cacheKey];
    }
  }, [cacheKey]);

  /**
   * Handle API errors
   */
  const handleError = useCallback((error: ApiError | Error) => {
    setError(error);
    setIsSuccess(false);
    
    // Show toast notification if enabled
    if (errorHandling.showToast) {
      let title = errorHandling.toastTitle || 'Error';
      let description = 'An unexpected error occurred';
      
      if (error instanceof ApiError) {
        switch (error.type) {
          case ApiErrorType.NETWORK_ERROR:
            description = 'Network error. Please check your connection.';
            break;
          case ApiErrorType.TIMEOUT:
            description = 'Request timed out. Please try again.';
            break;
          case ApiErrorType.UNAUTHORIZED:
            description = 'You are not authorized to perform this action.';
            break;
          case ApiErrorType.FORBIDDEN:
            description = 'You do not have permission to access this resource.';
            break;
          case ApiErrorType.NOT_FOUND:
            description = 'The requested resource was not found.';
            break;
          case ApiErrorType.VALIDATION_ERROR:
            description = error.message || 'Validation error. Please check your input.';
            break;
          case ApiErrorType.SERVER_ERROR:
            description = 'Server error. Please try again later.';
            break;
          default:
            description = error.message || description;
        }
      } else {
        description = error.message || description;
      }
      
      toast({
        title,
        description,
        variant: 'destructive',
      });
    }
    
    // Set error in global state
    dispatch({
      type: ActionType.SET_ERROR,
      payload: {
        key: 'api',
        message: error instanceof ApiError ? error.message : error.message,
      },
    });
    
    // Throw the error if required
    if (errorHandling.throw) {
      throw error;
    }
  }, [dispatch, errorHandling, toast]);

  /**
   * Fetch data from API or cache
   */
  const fetchData = useCallback(async (skipCache = false): Promise<T> => {
    const currentOptions = optionsRef.current;
    const currentCacheKey = currentOptions.cacheKey;
    const currentCacheTime = currentOptions.cacheTime ?? DEFAULT_CACHE_TIME;
    
    // Check if we should use cached data
    if (
      !skipCache &&
      currentCacheKey &&
      useCachedData && 
      API_CACHE[currentCacheKey] &&
      Date.now() - API_CACHE[currentCacheKey].timestamp < currentCacheTime
    ) {
      const cachedData = API_CACHE[currentCacheKey].data;
      setData(cachedData);
      setIsSuccess(true);
      setError(null);
      
      // If cache is getting stale, refresh in background
      const cacheAge = Date.now() - API_CACHE[currentCacheKey].timestamp;
      if (cacheAge > currentCacheTime * 0.8) {
        setIsRefreshing(true);
        try {
          const freshData = await fetchFnRef.current();
          const transformedData = transform ? transform(freshData) : freshData;
          
          setData(transformedData);
          API_CACHE[currentCacheKey] = {
            data: transformedData,
            timestamp: Date.now(),
          };
        } catch (err) {
          // Don't update error state for background refreshes
          console.error('Background refresh failed:', err);
        } finally {
          setIsRefreshing(false);
        }
      }
      
      return cachedData;
    }
    
    // Need to fetch fresh data
    setIsLoading(true);
    
    try {
      const response = await fetchFnRef.current();
      const transformedData = transform ? transform(response) : response;
      
      setData(transformedData);
      setIsSuccess(true);
      setError(null);
      
      // Cache the response if cache key is provided
      if (currentCacheKey) {
        API_CACHE[currentCacheKey] = {
          data: transformedData,
          timestamp: Date.now(),
        };
      }
      
      return transformedData;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      handleError(error as ApiError | Error);
      
      // Cache the error if cache key is provided
      if (currentCacheKey) {
        API_CACHE[currentCacheKey] = {
          data: null,
          timestamp: Date.now(),
          error,
        };
      }
      
      throw error;
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [handleError, transform, useCachedData]);

  /**
   * Manual refetch function
   */
  const refetch = useCallback(async (): Promise<T> => {
    return fetchData(true);
  }, [fetchData]);

  // Initial fetch on mount or when dependencies change
  useEffect(() => {
    if (skip) {
      return;
    }
    
    fetchData().catch(() => {
      // Error is already handled in fetchData
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, skip, ...deps]);

  return {
    data,
    isLoading,
    error,
    isRefreshing,
    isSuccess,
    refetch,
    clearCache,
  };
}

/**
 * Mutation hook for API calls that modify data (POST, PUT, DELETE, etc.)
 */
interface UseMutationOptions<TData, TVariables> {
  // Called before the mutation function is executed
  onMutate?: (variables: TVariables) => Promise<unknown> | unknown;
  
  // Called on successful mutation
  onSuccess?: (data: TData, variables: TVariables, context: unknown) => Promise<unknown> | unknown;
  
  // Called on error
  onError?: (error: ApiError | Error, variables: TVariables, context: unknown) => Promise<unknown> | unknown;
  
  // Called after either onSuccess or onError
  onSettled?: (
    data: TData | undefined,
    error: ApiError | Error | null,
    variables: TVariables,
    context: unknown
  ) => Promise<unknown> | unknown;
  
  // Whether to use an optimistic update
  optimistic?: boolean;
  
  // Error handling options
  errorHandling?: {
    // Show toast notification on error
    showToast?: boolean;
    
    // Custom title for error toast
    toastTitle?: string;
    
    // Whether to throw the error (otherwise it's returned in the hook result)
    throw?: boolean;
  };
}

interface UseMutationResult<TData, TVariables> {
  // Execute the mutation
  mutate: (variables: TVariables) => Promise<TData>;
  
  // The data returned from the mutation
  data: TData | null;
  
  // Loading state for the mutation
  isLoading: boolean;
  
  // Error state for the mutation
  error: ApiError | Error | null;
  
  // Whether the mutation was successful
  isSuccess: boolean;
  
  // Reset the mutation state
  reset: () => void;
}

export function useMutation<TData, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: UseMutationOptions<TData, TVariables> = {}
): UseMutationResult<TData, TVariables> {
  const {
    onMutate,
    onSuccess,
    onError,
    onSettled,
    errorHandling = {
      showToast: true,
      throw: false,
    },
  } = options;

  const { toast } = useToast();
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Handle mutation errors
   */
  const handleError = useCallback((error: ApiError | Error) => {
    setError(error);
    setIsSuccess(false);
    
    // Show toast notification if enabled
    if (errorHandling.showToast) {
      let title = errorHandling.toastTitle || 'Error';
      let description = 'An unexpected error occurred';
      
      if (error instanceof ApiError) {
        switch (error.type) {
          case ApiErrorType.NETWORK_ERROR:
            description = 'Network error. Please check your connection.';
            break;
          case ApiErrorType.TIMEOUT:
            description = 'Request timed out. Please try again.';
            break;
          case ApiErrorType.UNAUTHORIZED:
            description = 'You are not authorized to perform this action.';
            break;
          case ApiErrorType.FORBIDDEN:
            description = 'You do not have permission to access this resource.';
            break;
          case ApiErrorType.NOT_FOUND:
            description = 'The requested resource was not found.';
            break;
          case ApiErrorType.VALIDATION_ERROR:
            description = error.message || 'Validation error. Please check your input.';
            break;
          case ApiErrorType.SERVER_ERROR:
            description = 'Server error. Please try again later.';
            break;
          default:
            description = error.message || description;
        }
      } else {
        description = error.message || description;
      }
      
      toast({
        title,
        description,
        variant: 'destructive',
      });
    }
    
    // Throw the error if required
    if (errorHandling.throw) {
      throw error;
    }
  }, [errorHandling, toast]);

  /**
   * Execute the mutation
   */
  const mutate = useCallback(async (variables: TVariables): Promise<TData> => {
    setIsLoading(true);
    setError(null);
    
    let context;
    
    try {
      // Run onMutate callback
      if (onMutate) {
        context = await onMutate(variables);
      }
      
      // Execute the mutation
      const result = await mutationFn(variables);
      
      // Update state
      setData(result);
      setIsSuccess(true);
      
      // Run onSuccess callback
      if (onSuccess) {
        await onSuccess(result, variables, context);
      }
      
      // Run onSettled callback
      if (onSettled) {
        await onSettled(result, null, variables, context);
      }
      
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      
      // Update state
      handleError(error as ApiError | Error);
      
      // Run onError callback
      if (onError) {
        await onError(error as ApiError | Error, variables, context);
      }
      
      // Run onSettled callback
      if (onSettled) {
        await onSettled(undefined, error as ApiError | Error, variables, context);
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [handleError, mutationFn, onError, onMutate, onSettled, onSuccess]);

  /**
   * Reset the mutation state
   */
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsSuccess(false);
  }, []);

  return {
    mutate,
    data,
    isLoading,
    error,
    isSuccess,
    reset,
  };
}
