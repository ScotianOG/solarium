/**
 * App Context Provider
 * Global state management for the Sol-arium application
 */
"use client"

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { User } from '../auth-service';

// State shape
export interface AppState {
  // User-related state
  user: User | null;
  isAuthenticated: boolean;
  loading: {
    user: boolean;
    collections: boolean;
    marketplace: boolean;
    governance: boolean;
  };
  
  // UI state
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  
  // Feature flags
  features: {
    notifications: boolean;
    analytics: boolean;
    // Add other feature flags as needed
  };
  
  // Application data
  collections: any[]; // Replace with proper type
  marketplace: {
    items: any[]; // Replace with proper type
    filters: any; // Replace with proper type
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  };
  governance: {
    proposals: any[]; // Replace with proper type
    userVotingPower: number;
  };
  
  // Error state
  errors: {
    [key: string]: string | null;
  };
}

// Initial state
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  loading: {
    user: false,
    collections: false,
    marketplace: false,
    governance: false,
  },
  theme: 'system',
  sidebarOpen: false,
  features: {
    notifications: true,
    analytics: true,
  },
  collections: [],
  marketplace: {
    items: [],
    filters: {},
    pagination: {
      page: 1,
      pageSize: 20,
      totalItems: 0,
      totalPages: 0,
    },
  },
  governance: {
    proposals: [],
    userVotingPower: 0,
  },
  errors: {},
};

// Action types
export enum ActionType {
  // Auth actions
  SET_USER = 'SET_USER',
  CLEAR_USER = 'CLEAR_USER',
  
  // UI actions
  SET_THEME = 'SET_THEME',
  TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR',
  SET_SIDEBAR = 'SET_SIDEBAR',
  
  // Feature flag actions
  TOGGLE_FEATURE = 'TOGGLE_FEATURE',
  
  // Loading state actions
  SET_LOADING = 'SET_LOADING',
  
  // Data actions
  SET_COLLECTIONS = 'SET_COLLECTIONS',
  SET_MARKETPLACE_ITEMS = 'SET_MARKETPLACE_ITEMS',
  SET_MARKETPLACE_FILTERS = 'SET_MARKETPLACE_FILTERS',
  SET_MARKETPLACE_PAGINATION = 'SET_MARKETPLACE_PAGINATION',
  SET_GOVERNANCE_PROPOSALS = 'SET_GOVERNANCE_PROPOSALS',
  SET_VOTING_POWER = 'SET_VOTING_POWER',
  
  // Error handling
  SET_ERROR = 'SET_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
}

// Action interface
export interface Action {
  type: ActionType;
  payload?: any;
}

// Reducer function
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    // Auth actions
    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };
    case ActionType.CLEAR_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    
    // UI actions
    case ActionType.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case ActionType.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };
    case ActionType.SET_SIDEBAR:
      return {
        ...state,
        sidebarOpen: action.payload,
      };
    
    // Feature flag actions
    case ActionType.TOGGLE_FEATURE:
      return {
        ...state,
        features: {
          ...state.features,
          ...(action.payload && typeof action.payload === 'string' ? 
            { [action.payload]: !state.features[action.payload as keyof typeof state.features] } : 
            {}
          ),
        },
      };
    
    // Loading state actions
    case ActionType.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.value,
        },
      };
    
    // Data actions
    case ActionType.SET_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };
    case ActionType.SET_MARKETPLACE_ITEMS:
      return {
        ...state,
        marketplace: {
          ...state.marketplace,
          items: action.payload,
        },
      };
    case ActionType.SET_MARKETPLACE_FILTERS:
      return {
        ...state,
        marketplace: {
          ...state.marketplace,
          filters: action.payload,
        },
      };
    case ActionType.SET_MARKETPLACE_PAGINATION:
      return {
        ...state,
        marketplace: {
          ...state.marketplace,
          pagination: {
            ...state.marketplace.pagination,
            ...action.payload,
          },
        },
      };
    case ActionType.SET_GOVERNANCE_PROPOSALS:
      return {
        ...state,
        governance: {
          ...state.governance,
          proposals: action.payload,
        },
      };
    case ActionType.SET_VOTING_POWER:
      return {
        ...state,
        governance: {
          ...state.governance,
          userVotingPower: action.payload,
        },
      };
    
    // Error handling
    case ActionType.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.key]: action.payload.message,
        },
      };
    case ActionType.CLEAR_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload]: null,
        },
      };
    default:
      return state;
  }
}

// Create context
interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Persist theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);
  
  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as AppState['theme'] | null;
    if (savedTheme) {
      dispatch({ type: ActionType.SET_THEME, payload: savedTheme });
    }
  }, []);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the app context
export function useAppContext(): AppContextProps {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return context;
}

// Action creators
export const actions = {
  // Auth actions
  setUser: (user: User) => ({
    type: ActionType.SET_USER,
    payload: user,
  }),
  clearUser: () => ({
    type: ActionType.CLEAR_USER,
  }),
  
  // UI actions
  setTheme: (theme: AppState['theme']) => ({
    type: ActionType.SET_THEME,
    payload: theme,
  }),
  toggleSidebar: () => ({
    type: ActionType.TOGGLE_SIDEBAR,
  }),
  setSidebar: (isOpen: boolean) => ({
    type: ActionType.SET_SIDEBAR,
    payload: isOpen,
  }),
  
  // Feature flag actions
  toggleFeature: (featureKey: keyof AppState['features']) => ({
    type: ActionType.TOGGLE_FEATURE,
    payload: featureKey,
  }),
  
  // Loading state actions
  setLoading: (key: keyof AppState['loading'], value: boolean) => ({
    type: ActionType.SET_LOADING,
    payload: { key, value },
  }),
  
  // Data actions
  setCollections: (collections: any[]) => ({
    type: ActionType.SET_COLLECTIONS,
    payload: collections,
  }),
  setMarketplaceItems: (items: any[]) => ({
    type: ActionType.SET_MARKETPLACE_ITEMS,
    payload: items,
  }),
  setMarketplaceFilters: (filters: any) => ({
    type: ActionType.SET_MARKETPLACE_FILTERS,
    payload: filters,
  }),
  setMarketplacePagination: (pagination: Partial<AppState['marketplace']['pagination']>) => ({
    type: ActionType.SET_MARKETPLACE_PAGINATION,
    payload: pagination,
  }),
  setGovernanceProposals: (proposals: any[]) => ({
    type: ActionType.SET_GOVERNANCE_PROPOSALS,
    payload: proposals,
  }),
  setVotingPower: (power: number) => ({
    type: ActionType.SET_VOTING_POWER,
    payload: power,
  }),
  
  // Error handling
  setError: (key: string, message: string) => ({
    type: ActionType.SET_ERROR,
    payload: { key, message },
  }),
  clearError: (key: string) => ({
    type: ActionType.CLEAR_ERROR,
    payload: key,
  }),
};
