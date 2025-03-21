'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  href?: string
  withHover?: boolean
  withFadeIn?: boolean
  withBorder?: boolean
  withShadow?: boolean
  delay?: number
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  (
    {
      className,
      as: Component = 'div',
      children,
      href,
      withHover = true,
      withFadeIn = true,
      withBorder = true,
      withShadow = true,
      delay = 0,
      ...props
    },
    ref
  ) => {
    const Comp = href ? 'a' : Component
    const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}
    
    return (
      <Comp
        ref={ref}
        className={cn(
          'rounded-lg bg-card overflow-hidden transition-all duration-300',
          withFadeIn && 'animate-fade-in',
          withBorder && 'border border-border',
          withShadow && 'shadow-sm hover:shadow-md',
          withHover && 'hover-scale group',
          className
        )}
        style={{ 
          animationDelay: delay ? `${delay}ms` : undefined,
        }}
        {...linkProps}
        {...props}
      >
        {children}
        {href && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </Comp>
    )
  }
)
AnimatedCard.displayName = 'AnimatedCard'

interface AnimatedCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const AnimatedCardHeader = React.forwardRef<HTMLDivElement, AnimatedCardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
)
AnimatedCardHeader.displayName = 'AnimatedCardHeader'

interface AnimatedCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AnimatedCardTitle = React.forwardRef<HTMLParagraphElement, AnimatedCardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold leading-none tracking-tight text-card-foreground', className)}
      {...props}
    />
  )
)
AnimatedCardTitle.displayName = 'AnimatedCardTitle'

interface AnimatedCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const AnimatedCardDescription = React.forwardRef<HTMLParagraphElement, AnimatedCardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)
AnimatedCardDescription.displayName = 'AnimatedCardDescription'

interface AnimatedCardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const AnimatedCardContent = React.forwardRef<HTMLDivElement, AnimatedCardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  )
)
AnimatedCardContent.displayName = 'AnimatedCardContent'

interface AnimatedCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const AnimatedCardFooter = React.forwardRef<HTMLDivElement, AnimatedCardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
)
AnimatedCardFooter.displayName = 'AnimatedCardFooter'

interface AnimatedCardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: 'auto' | 'square' | 'video' | 'portrait'
  overlay?: boolean
}

const AnimatedCardImage = React.forwardRef<HTMLImageElement, AnimatedCardImageProps>(
  ({ className, aspectRatio = 'auto', overlay = false, ...props }, ref) => {
    const aspectRatioClasses = {
      auto: 'aspect-auto',
      square: 'aspect-square',
      video: 'aspect-video',
      portrait: 'aspect-[3/4]',
    }
    
    return (
      <div className={cn('relative overflow-hidden', aspectRatioClasses[aspectRatio])}>
        <img
          ref={ref}
          className={cn('object-cover w-full h-full transition-transform group-hover:scale-105 duration-500', className)}
          {...props}
        />
        {overlay && (
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
        )}
      </div>
    )
  }
)
AnimatedCardImage.displayName = 'AnimatedCardImage'

export {
  AnimatedCard,
  AnimatedCardHeader,
  AnimatedCardTitle,
  AnimatedCardDescription,
  AnimatedCardContent,
  AnimatedCardFooter,
  AnimatedCardImage,
}
