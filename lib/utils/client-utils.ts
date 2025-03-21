/**
 * Utility functions for client/server rendering
 */

/**
 * Check if code is running on the client-side (browser)
 */
export const isClient = typeof window !== 'undefined';

/**
 * Get the current window width (safely - returns 0 on server)
 */
export const getWindowWidth = (): number => {
  return isClient ? window.innerWidth : 0;
};

/**
 * Get the current window height (safely - returns 0 on server)
 */
export const getWindowHeight = (): number => {
  return isClient ? window.innerHeight : 0;
};

/**
 * Safe localStorage wrapper that works on server-side
 */
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    return isClient ? localStorage.getItem(key) : null;
  },
  setItem: (key: string, value: string): void => {
    if (isClient) {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (isClient) {
      localStorage.removeItem(key);
    }
  },
};

/**
 * Safe window.matchMedia wrapper
 */
export const safeMatchMedia = (query: string): MediaQueryList | null => {
  return isClient ? window.matchMedia(query) : null;
};
