import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary, { ErrorFallback, useErrorBoundary } from '@/components/error-boundary';
import { ApiError, ApiErrorType } from '@/lib/api-client';

// Mock console.error to prevent test output noise
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});
afterAll(() => {
  console.error = originalConsoleError;
});

// Component that throws an error on render
const ErrorThrowingComponent = ({ message = 'Test error' }: { message?: string }) => {
  throw new Error(message);
};

// Component that throws an error when a button is clicked
const ThrowErrorButton = ({ message = 'Test error' }: { message?: string }) => {
  const { showBoundary } = useErrorBoundary();
  
  return (
    <button onClick={() => showBoundary(new Error(message))}>
      Throw Error
    </button>
  );
};

describe('ErrorBoundary Component', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="test-child">Test Child</div>
      </ErrorBoundary>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
  
  it('renders default ErrorFallback when an error is thrown', () => {
    // Suppress React's error boundary warning in test environment
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });
  
  it('renders custom fallback node when provided', () => {
    // Suppress React's error boundary warning in test environment
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary fallback={<div data-testid="custom-fallback">Custom Fallback</div>}>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );
    
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
  });
  
  it('renders custom fallback function when provided', () => {
    // Suppress React's error boundary warning in test environment
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary 
        fallback={(error, resetError) => (
          <div>
            <span data-testid="error-message">{error.message}</span>
            <button data-testid="reset-button" onClick={resetError}>Reset</button>
          </div>
        )}
      >
        <ErrorThrowingComponent message="Custom Error" />
      </ErrorBoundary>
    );
    
    expect(screen.getByTestId('error-message')).toHaveTextContent('Custom Error');
    expect(screen.getByTestId('reset-button')).toBeInTheDocument();
  });
  
  it('calls onError when an error occurs', () => {
    // Suppress React's error boundary warning in test environment
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const onError = jest.fn();
    render(
      <ErrorBoundary onError={onError}>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );
    
    expect(onError).toHaveBeenCalled();
  });
});

describe('ErrorFallback Component', () => {
  it('renders with default error', () => {
    render(<ErrorFallback error={new Error('Test error')} />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });
  
  it('renders with API error types correctly', () => {
    render(<ErrorFallback error={new ApiError('Not Found', ApiErrorType.NOT_FOUND)} />);
    expect(screen.getByText('Not Found')).toBeInTheDocument();
    expect(screen.getByText('The requested resource was not found.')).toBeInTheDocument();
  });
  
  it('calls resetError when button is clicked', () => {
    const resetError = jest.fn();
    render(<ErrorFallback error={new Error('Test error')} resetError={resetError} />);
    
    fireEvent.click(screen.getByText('Try again'));
    expect(resetError).toHaveBeenCalledTimes(1);
  });
  
  it('shows different action text based on error type', () => {
    render(<ErrorFallback error={new ApiError('Unauthorized', ApiErrorType.UNAUTHORIZED)} resetError={() => {}} />);
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });
});

// Note: Testing hooks directly is challenging. 
// This is a simplified test that shows the hook works in a component context.
describe('useErrorBoundary Hook', () => {
  it('throws error when showBoundary is called', () => {
    // Suppress React's error boundary warning in test environment
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ThrowErrorButton message="Hook Error" />
      </ErrorBoundary>
    );
    
    fireEvent.click(screen.getByText('Throw Error'));
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Hook Error')).toBeInTheDocument();
  });
});
