/**
 * Authentication Service for Sol-arium
 * Handles user authentication, token management, and session state
 */

'use client'

import { post, get, del } from './api-client';
import { isClient, safeLocalStorage } from './utils/client-utils';

// Token storage keys
const AUTH_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA_KEY = 'user_data';

// Auth endpoints
const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  PROFILE: '/auth/profile',
  PASSWORD_RESET: '/auth/password-reset',
  PASSWORD_RESET_CONFIRM: '/auth/password-reset/confirm',
  VERIFY_EMAIL: '/auth/verify-email',
};

// Auth event types
export enum AuthEventType {
  LOGIN = 'login',
  LOGOUT = 'logout',
  TOKEN_REFRESHED = 'token_refreshed',
  SESSION_EXPIRED = 'session_expired',
}

// Auth event interface
export interface AuthEvent {
  type: AuthEventType;
  payload?: any;
}

// Auth event listener type
type AuthEventListener = (event: AuthEvent) => void;

// User data interface
export interface User {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  profileImage?: string;
  roles?: string[];
  verifiedEmail?: boolean;
  createdAt?: string;
  updatedAt?: string;
  // Add other user properties as needed
}

// Login request interface
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Register request interface
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  fullName?: string;
}

// Auth response interface
interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresIn?: number;
}

// Password reset request
export interface PasswordResetRequest {
  email: string;
}

// Password reset confirm request
export interface PasswordResetConfirmRequest {
  token: string;
  password: string;
}

/**
 * Authentication service class
 */
class AuthService {
  private listeners: AuthEventListener[] = [];
  private refreshPromise: Promise<string> | null = null;
  private refreshTimeout: NodeJS.Timeout | null = null;
  private user: User | null = null;
  
  constructor() {
    // Initialize user from storage on service creation
    this.loadUserFromStorage();
    
    // Set up token refresh if user is logged in
    if (this.isAuthenticated()) {
      this.setupTokenRefresh();
    }
  }

  /**
   * Register event listener
   */
  addEventListener(listener: AuthEventListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Emit auth event to all listeners
   */
  private emitEvent(event: AuthEvent): void {
    this.listeners.forEach(listener => {
      try {
        listener(event);
      } catch (error) {
        console.error('Error in auth event listener', error);
      }
    });
  }

  /**
   * Load user data from storage
   */
  private loadUserFromStorage(): void {
    if (!isClient) return;
    
    try {
      const userData = safeLocalStorage.getItem(USER_DATA_KEY);
      
      if (userData) {
        this.user = JSON.parse(userData);
      }
    } catch (error) {
      console.error('Failed to load user data from storage', error);
      this.clearAuthData();
    }
  }

  /**
   * Save auth data to storage
   */
  private saveAuthData(response: AuthResponse): void {
    if (!isClient) return;
    
    try {
      safeLocalStorage.setItem(AUTH_TOKEN_KEY, response.token);
      safeLocalStorage.setItem(USER_DATA_KEY, JSON.stringify(response.user));
      
      if (response.refreshToken) {
        safeLocalStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
      }
      
      this.user = response.user;
    } catch (error) {
      console.error('Failed to save auth data to storage', error);
    }
  }

  /**
   * Clear auth data from storage
   */
  private clearAuthData(): void {
    if (!isClient) return;
    
    safeLocalStorage.removeItem(AUTH_TOKEN_KEY);
    safeLocalStorage.removeItem(REFRESH_TOKEN_KEY);
    safeLocalStorage.removeItem(USER_DATA_KEY);
    this.user = null;
    
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
  }

  /**
   * Set up automatic token refresh
   */
  private setupTokenRefresh(expiresIn?: number): void {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }
    
    // Default to 55 minutes if expiresIn not provided
    // This assumes the token expires in 1 hour (common JWT default)
    const refreshTime = (expiresIn || 55 * 60) * 1000;
    
    this.refreshTimeout = setTimeout(() => {
      this.refreshToken().catch(error => {
        console.error('Failed to refresh token', error);
        this.handleSessionExpired();
      });
    }, refreshTime);
  }

  /**
   * Handle session expired
   */
  private handleSessionExpired(): void {
    this.clearAuthData();
    this.emitEvent({ type: AuthEventType.SESSION_EXPIRED });
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<string> {
    // If already refreshing, return the existing promise
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    const refreshToken = safeLocalStorage.getItem(REFRESH_TOKEN_KEY);
    
    if (!refreshToken) {
      this.handleSessionExpired();
      return Promise.reject(new Error('No refresh token available'));
    }

    try {
      this.refreshPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await post<AuthResponse>(AUTH_ENDPOINTS.REFRESH, { refreshToken });
          
          this.saveAuthData(response);
          this.setupTokenRefresh(response.expiresIn);
          
          this.emitEvent({ 
            type: AuthEventType.TOKEN_REFRESHED,
            payload: { token: response.token }
          });
          
          resolve(response.token);
        } catch (error) {
          this.handleSessionExpired();
          reject(error);
        } finally {
          this.refreshPromise = null;
        }
      });
      
      return this.refreshPromise;
    } catch (error) {
      this.refreshPromise = null;
      this.handleSessionExpired();
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!safeLocalStorage.getItem(AUTH_TOKEN_KEY);
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.user;
  }

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return safeLocalStorage.getItem(AUTH_TOKEN_KEY);
  }

  /**
   * Log in user
   */
  async login(credentials: LoginRequest): Promise<User> {
    const response = await post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
    
    this.saveAuthData(response);
    this.setupTokenRefresh(response.expiresIn);
    
    this.emitEvent({ 
      type: AuthEventType.LOGIN,
      payload: { user: response.user }
    });
    
    return response.user;
  }

  /**
   * Register new user
   */
  async register(userData: RegisterRequest): Promise<User> {
    const response = await post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, userData);
    
    this.saveAuthData(response);
    this.setupTokenRefresh(response.expiresIn);
    
    this.emitEvent({ 
      type: AuthEventType.LOGIN,
      payload: { user: response.user }
    });
    
    return response.user;
  }

  /**
   * Log out user
   */
  async logout(): Promise<void> {
    const refreshToken = safeLocalStorage.getItem(REFRESH_TOKEN_KEY);
    
    // Only make API call if we have a token
    if (refreshToken) {
      try {
        await post(AUTH_ENDPOINTS.LOGOUT, { refreshToken });
      } catch (error) {
        console.error('Error during logout', error);
      }
    }
    
    this.clearAuthData();
    this.emitEvent({ type: AuthEventType.LOGOUT });
  }

  /**
   * Get user profile
   */
  async getProfile(): Promise<User> {
    const user = await get<User>(AUTH_ENDPOINTS.PROFILE);
    
    // Update stored user data
    if (user && isClient) {
      safeLocalStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
      this.user = user;
    }
    
    return user;
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(request: PasswordResetRequest): Promise<void> {
    await post(AUTH_ENDPOINTS.PASSWORD_RESET, request);
  }

  /**
   * Confirm password reset
   */
  async confirmPasswordReset(request: PasswordResetConfirmRequest): Promise<void> {
    await post(AUTH_ENDPOINTS.PASSWORD_RESET_CONFIRM, request);
  }

  /**
   * Verify email address
   */
  async verifyEmail(token: string): Promise<void> {
    await get(`${AUTH_ENDPOINTS.VERIFY_EMAIL}?token=${token}`);
    
    // Update user data after email verification
    if (this.isAuthenticated()) {
      await this.getProfile();
    }
  }
}

// Create and export singleton instance
export const authService = new AuthService();

// Export default for direct imports
export default authService;
