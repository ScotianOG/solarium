'use client'

import * as React from "react"
import { isClient, safeMatchMedia } from "@/lib/utils/client-utils"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [mounted, setMounted] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Mark component as mounted
    setMounted(true)
    
    // Define update function
    const updateSize = () => {
      if (isClient) {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }
    }

    // Initial check
    updateSize()
    
    // Set up media query listener (more efficient than resize)
    const mql = safeMatchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    if (mql) {
      const onChange = () => setIsMobile(mql.matches)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    } 
    
    // Fallback to resize if matchMedia not available
    if (isClient) {
      window.addEventListener('resize', updateSize)
      return () => window.removeEventListener('resize', updateSize)
    }
    
    return undefined
  }, [])

  // When rendering on the server, default to non-mobile
  // Only return the actual value after client-side hydration
  return mounted ? isMobile : false
}
