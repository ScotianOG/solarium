'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SkipLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string
}

/**
 * SkipLink component allows keyboard users to bypass navigation and jump directly to main content
 * This improves accessibility for keyboard and screen reader users
 */
export function SkipLink({ className, children = 'Skip to content', ...props }: SkipLinkProps) {
  return (
    <a
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:text-foreground focus:p-3 focus:border focus:border-border focus:rounded-md focus:outline-none focus:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}
