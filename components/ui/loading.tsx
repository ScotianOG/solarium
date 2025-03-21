/**
 * Loading component with various loading states and skeleton loaders
 */

import React from 'react';
import { Skeleton } from './skeleton';
import { cn } from '@/lib/utils';

// Loading spinner sizes
type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Component skeleton types
type SkeletonType = 
  | 'text' 
  | 'avatar' 
  | 'button' 
  | 'card' 
  | 'image' 
  | 'banner'
  | 'table'
  | 'list'
  | 'grid';

// Props for the Spinner component
interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  color?: string;
}

// Props for the LoadingSkeleton component
interface LoadingSkeletonProps {
  type: SkeletonType;
  count?: number;
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean | string;
}

// Props for the LoadingOverlay component
interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  spinnerSize?: SpinnerSize;
  text?: string;
  blur?: boolean;
}

// Props for the LoadingPlaceholder component
interface LoadingPlaceholderProps {
  isLoading: boolean;
  children: React.ReactNode;
  skeleton: SkeletonType | React.ReactNode;
  count?: number;
  className?: string;
}

/**
 * Spinner component for loading states
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => {
  const sizeMap = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <svg
        className={cn('animate-spin', sizeMap[size])}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill={color}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

/**
 * Loading skeleton component for various UI elements
 */
export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type,
  count = 1,
  className = '',
  width,
  height,
  rounded = false,
}) => {
  const getTypeStyles = (): string => {
    switch (type) {
      case 'text':
        return 'h-4 w-full';
      case 'avatar':
        return 'h-10 w-10 rounded-full';
      case 'button':
        return 'h-9 w-24';
      case 'card':
        return 'h-[320px] w-full rounded-xl';
      case 'image':
        return 'h-48 w-full rounded-md';
      case 'banner':
        return 'h-32 w-full rounded-md';
      case 'table':
        return 'h-[400px] w-full rounded-md';
      case 'list':
        return 'h-12 w-full';
      case 'grid':
        return 'h-[200px] w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-12px)] rounded-md';
      default:
        return '';
    }
  };

  const renderSkeletons = () => {
    return Array(count)
      .fill(0)
      .map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            getTypeStyles(),
            className,
            typeof rounded === 'string' ? `rounded-${rounded}` : rounded ? 'rounded-md' : ''
          )}
          style={{
            width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
            height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
          }}
        />
      ));
  };

  if (type === 'list') {
    return (
      <div className="space-y-3 w-full">
        {renderSkeletons()}
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {renderSkeletons()}
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className="space-y-2 w-full">
        {renderSkeletons()}
      </div>
    );
  }

  return <>{renderSkeletons()}</>;
};

/**
 * Loading overlay component that shows a spinner over content
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children,
  className = '',
  spinnerSize = 'lg',
  text,
  blur = true,
}) => {
  return (
    <div className={cn('relative', className)}>
      {children}
      
      {isLoading && (
        <div className={cn(
          'absolute inset-0 flex flex-col items-center justify-center z-10',
          'bg-background/80 transition-all duration-200',
          blur ? 'backdrop-blur-sm' : ''
        )}>
          <Spinner size={spinnerSize} />
          {text && <p className="mt-3 text-sm text-muted-foreground">{text}</p>}
        </div>
      )}
    </div>
  );
};

/**
 * Loading placeholder that shows skeletons when loading
 */
export const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = ({
  isLoading,
  children,
  skeleton,
  count,
  className = '',
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  if (React.isValidElement(skeleton)) {
    return <div className={className}>{skeleton}</div>;
  }

  return (
    <div className={className}>
      <LoadingSkeleton type={skeleton as SkeletonType} count={count || 1} />
    </div>
  );
};

/**
 * Card skeleton for showing placeholder card UI
 */
export const CardSkeleton = () => (
  <div className="rounded-xl border bg-card p-4 space-y-4">
    <Skeleton className="h-10 w-1/3" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/4" />
    </div>
    <div className="pt-4 flex justify-between">
      <Skeleton className="h-9 w-24" />
      <Skeleton className="h-9 w-[100px]" />
    </div>
  </div>
);

/**
 * Profile skeleton for showing placeholder profile UI
 */
export const ProfileSkeleton = () => (
  <div className="space-y-8">
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <Skeleton className="h-16 w-16 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <Skeleton className="h-9 w-[120px]" />
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <Skeleton className="h-[120px] rounded-xl" />
      <Skeleton className="h-[120px] rounded-xl" />
      <Skeleton className="h-[120px] rounded-xl" />
    </div>
  </div>
);

/**
 * Table skeleton for showing placeholder table UI
 */
export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-4 gap-4">
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
    </div>
    <div className="space-y-3">
      {Array(rows)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4">
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
          </div>
        ))}
    </div>
  </div>
);

export default {
  Spinner,
  LoadingSkeleton,
  LoadingOverlay,
  LoadingPlaceholder,
  CardSkeleton,
  ProfileSkeleton,
  TableSkeleton,
};
