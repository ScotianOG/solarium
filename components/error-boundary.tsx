/**
 * Error Boundary component to catch and handle errors gracefully
 */

import React, { Component, ErrorInfo, ReactNode, useState } from 'react';
import { ApiError, ApiErrorType } from '@/lib/api-client';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, resetError: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Class Component
 * Catches JavaScript errors anywhere in child component tree and displays fallback UI
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError && error) {
      if (typeof fallback === 'function') {
        return fallback(error, this.resetError);
      }
      
      if (fallback) {
        return fallback;
      }
      
      return <ErrorFallback error={error} resetError={this.resetError} />;
    }

    return children;
  }
}

/**
 * Props for the ErrorFallback component
 */
interface ErrorFallbackProps {
  error: Error;
  resetError?: () => void;
}

/**
 * Default error fallback UI
 */
export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  resetError 
}) => {
  // Determine error message and action based on error type
  let title = 'Something went wrong';
  let message = error.message || 'An unexpected error has occurred.';
  let actionText = 'Try again';
  
  // Handle API errors
  if (error instanceof ApiError) {
    switch (error.type) {
      case ApiErrorType.NETWORK_ERROR:
        title = 'Network Error';
        message = 'Unable to connect to the server. Please check your internet connection.';
        actionText = 'Retry';
        break;
      case ApiErrorType.TIMEOUT:
        title = 'Request Timeout';
        message = 'The server took too long to respond. Please try again later.';
        actionText = 'Retry';
        break;
      case ApiErrorType.UNAUTHORIZED:
        title = 'Authentication Required';
        message = 'You need to be logged in to access this feature.';
        actionText = 'Log In';
        break;
      case ApiErrorType.FORBIDDEN:
        title = 'Access Denied';
        message = 'You do not have permission to access this resource.';
        break;
      case ApiErrorType.NOT_FOUND:
        title = 'Not Found';
        message = 'The requested resource was not found.';
        actionText = 'Go Back';
        break;
      case ApiErrorType.VALIDATION_ERROR:
        title = 'Validation Error';
        message = error.message || 'There was an issue with the provided data.';
        actionText = 'Try Again';
        break;
      case ApiErrorType.SERVER_ERROR:
        title = 'Server Error';
        message = 'The server encountered an error. Our team has been notified.';
        actionText = 'Retry';
        break;
    }
  }

  return (
    <div className="rounded-md bg-destructive/10 p-6 text-destructive flex flex-col items-center justify-center min-h-[200px]">
      <div className="flex flex-col items-center gap-4 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-10"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm opacity-80">{message}</p>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-black/10 rounded text-left overflow-auto max-h-[200px] text-xs">
              <pre>{error.stack}</pre>
            </div>
          )}
        </div>
        
        {resetError && (
          <button
            onClick={resetError}
            className="mt-4 px-4 py-2 rounded bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Hook to use error boundary functionality in function components
 */
export function useErrorBoundary(): {
  showBoundary: (error: Error) => void;
} {
  const [error, setError] = useState<Error | null>(null);
  
  if (error) {
    throw error;
  }
  
  return {
    showBoundary: (error: Error) => setError(error),
  };
}

export default ErrorBoundary;
