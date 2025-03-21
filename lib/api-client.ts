/**
 * API Client for Sol-arium
 * Handles API requests, error handling, and request/response interceptors
 */

// Base API URL - replace with your actual API URL in production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.solarium.example/v1';

// Request timeout in milliseconds
const DEFAULT_TIMEOUT = 30000;

/**
 * Error types that can be returned by the API
 */
export enum ApiErrorType {
  NETWORK_ERROR = 'network_error',
  TIMEOUT = 'timeout',
  SERVER_ERROR = 'server_error',
  VALIDATION_ERROR = 'validation_error',
  UNAUTHORIZED = 'unauthorized',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
  UNKNOWN = 'unknown',
}

/**
 * Custom API error class
 */
export class ApiError extends Error {
  type: ApiErrorType;
  status?: number;
  data?: any;

  constructor(message: string, type: ApiErrorType, status?: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.status = status;
    this.data = data;
  }
}

/**
 * Options for API requests
 */
export interface ApiRequestOptions extends RequestInit {
  timeout?: number;
  params?: Record<string, string | number | boolean | undefined | null>;
}

/**
 * Formats query parameters for URL
 */
function formatQueryParams(params: Record<string, any>): string {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });
  
  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Makes an API request with error handling
 */
export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const {
    timeout = DEFAULT_TIMEOUT,
    params,
    headers = {},
    ...fetchOptions
  } = options;

  // Get auth token from storage
  const token = localStorage.getItem('auth_token');

  // Create request URL with query parameters
  const queryString = params ? formatQueryParams(params) : '';
  const url = `${API_BASE_URL}${endpoint}${queryString}`;

  // Set up headers
  const requestHeaders = new Headers(headers);
  
  // Add auth token if available
  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }
  
  // Set default content type if not specified and method is not GET
  if (fetchOptions.method && fetchOptions.method !== 'GET' && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  // Handle request timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: requestHeaders,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle response based on status
    if (response.ok) {
      // For 204 No Content, return null
      if (response.status === 204) {
        return null as T;
      }
      
      // Parse response based on content type
      const contentType = response.headers.get('Content-Type') || '';
      if (contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text() as unknown as T;
      }
    }

    // Handle different error status codes
    let errorType: ApiErrorType = ApiErrorType.UNKNOWN;
    let errorData;

    try {
      // Try to parse error response as JSON
      errorData = await response.json();
    } catch {
      // If parsing fails, use text
      errorData = await response.text();
    }

    // Determine error type based on status code
    switch (response.status) {
      case 400:
        errorType = ApiErrorType.VALIDATION_ERROR;
        break;
      case 401:
        errorType = ApiErrorType.UNAUTHORIZED;
        break;
      case 403:
        errorType = ApiErrorType.FORBIDDEN;
        break;
      case 404:
        errorType = ApiErrorType.NOT_FOUND;
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        errorType = ApiErrorType.SERVER_ERROR;
        break;
    }

    throw new ApiError(
      errorData?.message || `API Error: ${response.status}`,
      errorType,
      response.status,
      errorData
    );
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle AbortError (timeout)
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request timeout', ApiErrorType.TIMEOUT);
    }

    // Handle fetch errors (network issues)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError('Network error', ApiErrorType.NETWORK_ERROR);
    }

    // Re-throw ApiError
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle any other errors
    throw new ApiError(
      (error as Error)?.message || 'Unknown error',
      ApiErrorType.UNKNOWN
    );
  }
}

/**
 * Convenience method for GET requests
 */
export function get<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
  return apiRequest<T>(endpoint, { ...options, method: 'GET' });
}

/**
 * Convenience method for POST requests
 */
export function post<T>(
  endpoint: string,
  data?: any,
  options: ApiRequestOptions = {}
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * Convenience method for PUT requests
 */
export function put<T>(
  endpoint: string,
  data?: any,
  options: ApiRequestOptions = {}
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * Convenience method for PATCH requests
 */
export function patch<T>(
  endpoint: string,
  data?: any,
  options: ApiRequestOptions = {}
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * Convenience method for DELETE requests
 */
export function del<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
  return apiRequest<T>(endpoint, { ...options, method: 'DELETE' });
}
