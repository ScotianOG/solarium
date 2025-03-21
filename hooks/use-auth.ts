/**
 * Authentication hook for managing user authentication state and operations
 */

import { useEffect, useState, useCallback } from 'react';
import { useAppContext, actions } from '@/lib/state/app-context';
import authService, { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  AuthEventType,
  PasswordResetRequest
} from '@/lib/auth-service';
import { useToast } from '@/hooks/use-toast';

export interface UseAuthReturn {
  // Authentication state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Authentication methods
  login: (credentials: LoginRequest) => Promise<User>;
  register: (userData: RegisterRequest) => Promise<User>;
  logout: () => Promise<void>;
  getProfile: () => Promise<User>;
  requestPasswordReset: (email: string) => Promise<void>;
  confirmPasswordReset: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

/**
 * Hook for handling authentication-related operations
 */
export function useAuth(): UseAuthReturn {
  const { state, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Set up auth event listener
  useEffect(() => {
    const removeListener = authService.addEventListener((event) => {
      switch (event.type) {
        case AuthEventType.LOGIN:
          // Update global state with user info
          if (event.payload?.user) {
            dispatch(actions.setUser(event.payload.user));
          }
          break;
          
        case AuthEventType.LOGOUT:
        case AuthEventType.SESSION_EXPIRED:
          // Clear user from global state
          dispatch(actions.clearUser());
          
          // Show message for session expiry
          if (event.type === AuthEventType.SESSION_EXPIRED) {
            toast({
              title: "Session Expired",
              description: "Your session has expired. Please log in again.",
              variant: "destructive",
            });
          }
          break;
      }
    });
    
    // Initialize auth state
    const initializeAuth = async () => {
      if (authService.isAuthenticated()) {
        setIsLoading(true);
        try {
          const user = await authService.getProfile();
          dispatch(actions.setUser(user));
        } catch (error) {
          console.error('Failed to load user profile', error);
          // Silent fail - the auth service will handle session expiry
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    initializeAuth();
    
    // Clean up listener on unmount
    return () => {
      removeListener();
    };
  }, [dispatch, toast]);
  
  /**
   * Login user
   */
  const login = useCallback(async (credentials: LoginRequest): Promise<User> => {
    setIsLoading(true);
    try {
      const user = await authService.login(credentials);
      return user;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  /**
   * Register new user
   */
  const register = useCallback(async (userData: RegisterRequest): Promise<User> => {
    setIsLoading(true);
    try {
      const user = await authService.register(userData);
      return user;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  /**
   * Logout user
   */
  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  /**
   * Get user profile
   */
  const getProfile = useCallback(async (): Promise<User> => {
    setIsLoading(true);
    try {
      const user = await authService.getProfile();
      dispatch(actions.setUser(user));
      return user;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);
  
  /**
   * Request password reset
   */
  const requestPasswordReset = useCallback(async (email: string): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.requestPasswordReset({ email });
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  /**
   * Confirm password reset
   */
  const confirmPasswordReset = useCallback(async (token: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.confirmPasswordReset({ token, password });
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  /**
   * Verify email address
   */
  const verifyEmail = useCallback(async (token: string): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.verifyEmail(token);
      // If user is logged in, refresh profile to update email verification status
      if (state.isAuthenticated) {
        await getProfile();
      }
    } finally {
      setIsLoading(false);
    }
  }, [state.isAuthenticated, getProfile]);
  
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    getProfile,
    requestPasswordReset,
    confirmPasswordReset,
    verifyEmail
  };
}

export default useAuth;
