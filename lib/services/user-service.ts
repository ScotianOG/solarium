/**
 * User Service
 * Handles API requests for user-related features like profiles, collections, and activity
 */

import { get, post, put, del } from '../api-client';
import { CollectionData, MarketplaceItem } from './marketplace-service';

// Types
export interface UserProfile {
  id: string;
  username: string;
  fullName?: string;
  email: string;
  bio?: string;
  website?: string;
  profileImage?: string;
  coverImage?: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    discord?: string;
    telegram?: string;
    github?: string;
  };
  joinedDate: string;
  verified: boolean;
  isCreator: boolean;
  followers: number;
  following: number;
  totalCreated: number;
  totalCollected: number;
  totalSold: number;
}

export interface UserStats {
  totalSales: number;
  totalPurchases: number;
  totalItemsCreated: number;
  totalCollectionsCreated: number;
  totalItemsSold: number;
  totalItemsPurchased: number;
  totalLikesReceived: number;
  totalFollowers: number;
  totalFollowing: number;
  totalViews: number;
}

export interface UserActivity {
  id: string;
  type: 'sale' | 'purchase' | 'listing' | 'bid' | 'like' | 'follow' | 'create' | 'mint';
  timestamp: string;
  data: {
    item?: {
      id: string;
      title: string;
      imageUrl: string;
    };
    collection?: {
      id: string;
      name: string;
    };
    price?: number;
    currency?: string;
    otherUser?: {
      id: string;
      username: string;
      profileImage?: string;
    };
  };
}

export interface UserActivityResponse {
  activities: UserActivity[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

// Endpoints
const USER_ENDPOINTS = {
  PROFILE: (username: string) => `/users/${username}`,
  UPDATE_PROFILE: '/users/profile',
  USER_STATS: (username: string) => `/users/${username}/stats`,
  USER_COLLECTIONS: (username: string) => `/users/${username}/collections`,
  USER_CREATED: (username: string) => `/users/${username}/created`,
  USER_COLLECTED: (username: string) => `/users/${username}/collected`,
  USER_ACTIVITY: (username: string) => `/users/${username}/activity`,
  USER_FAVORITES: (username: string) => `/users/${username}/favorites`,
  FOLLOW_USER: (username: string) => `/users/${username}/follow`,
  FOLLOWERS: (username: string) => `/users/${username}/followers`,
  FOLLOWING: (username: string) => `/users/${username}/following`,
  SEARCH_USERS: '/users/search',
};

/**
 * Get user profile by username
 */
export async function getUserProfile(username: string): Promise<UserProfile> {
  return await get<UserProfile>(USER_ENDPOINTS.PROFILE(username));
}

/**
 * Update current user's profile
 */
export async function updateUserProfile(
  profileData: Partial<
    Omit<UserProfile, 'id' | 'username' | 'email' | 'joinedDate' | 'verified' | 'isCreator' | 'followers' | 'following' | 'totalCreated' | 'totalCollected' | 'totalSold'>
  >
): Promise<UserProfile> {
  return await put<UserProfile>(USER_ENDPOINTS.UPDATE_PROFILE, profileData);
}

/**
 * Get user statistics
 */
export async function getUserStats(username: string): Promise<UserStats> {
  return await get<UserStats>(USER_ENDPOINTS.USER_STATS(username));
}

/**
 * Get collections created by a user
 */
export async function getUserCollections(
  username: string,
  page = 1,
  pageSize = 20
): Promise<{
  collections: CollectionData[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}> {
  return await get<{
    collections: CollectionData[];
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  }>(USER_ENDPOINTS.USER_COLLECTIONS(username), {
    params: {
      page,
      pageSize,
    },
  });
}

/**
 * Get items created by a user
 */
export async function getUserCreatedItems(
  username: string,
  page = 1,
  pageSize = 20
): Promise<{
  items: MarketplaceItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}> {
  return await get<{
    items: MarketplaceItem[];
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  }>(USER_ENDPOINTS.USER_CREATED(username), {
    params: {
      page,
      pageSize,
    },
  });
}

/**
 * Get items collected by a user
 */
export async function getUserCollectedItems(
  username: string,
  page = 1,
  pageSize = 20
): Promise<{
  items: MarketplaceItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}> {
  return await get<{
    items: MarketplaceItem[];
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  }>(USER_ENDPOINTS.USER_COLLECTED(username), {
    params: {
      page,
      pageSize,
    },
  });
}

/**
 * Get user activity
 */
export async function getUserActivity(
  username: string,
  page = 1,
  pageSize = 20,
  activityTypes?: string[]
): Promise<UserActivityResponse> {
  const params: Record<string, string | number | boolean | undefined | null> = {
    page,
    pageSize,
  };
  
  // Handle activity types filter
  if (activityTypes?.length) {
    params.types = activityTypes.join(',');
  }
  
  return await get<UserActivityResponse>(USER_ENDPOINTS.USER_ACTIVITY(username), {
    params,
  });
}

/**
 * Get items favorited by a user
 */
export async function getUserFavorites(
  username: string,
  page = 1,
  pageSize = 20
): Promise<{
  items: MarketplaceItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}> {
  return await get<{
    items: MarketplaceItem[];
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  }>(USER_ENDPOINTS.USER_FAVORITES(username), {
    params: {
      page,
      pageSize,
    },
  });
}

/**
 * Follow or unfollow a user
 */
export async function toggleFollowUser(
  username: string
): Promise<{ following: boolean; followerCount: number }> {
  return await post<{ following: boolean; followerCount: number }>(
    USER_ENDPOINTS.FOLLOW_USER(username)
  );
}

/**
 * Get user's followers
 */
export async function getUserFollowers(
  username: string,
  page = 1,
  pageSize = 20
): Promise<{
  users: {
    id: string;
    username: string;
    fullName?: string;
    profileImage?: string;
    isFollowing: boolean;
  }[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}> {
  return await get<{
    users: {
      id: string;
      username: string;
      fullName?: string;
      profileImage?: string;
      isFollowing: boolean;
    }[];
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  }>(USER_ENDPOINTS.FOLLOWERS(username), {
    params: {
      page,
      pageSize,
    },
  });
}

/**
 * Get users that a user is following
 */
export async function getUserFollowing(
  username: string,
  page = 1,
  pageSize = 20
): Promise<{
  users: {
    id: string;
    username: string;
    fullName?: string;
    profileImage?: string;
    isFollowing: boolean;
  }[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}> {
  return await get<{
    users: {
      id: string;
      username: string;
      fullName?: string;
      profileImage?: string;
      isFollowing: boolean;
    }[];
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  }>(USER_ENDPOINTS.FOLLOWING(username), {
    params: {
      page,
      pageSize,
    },
  });
}

/**
 * Search for users
 */
export async function searchUsers(
  query: string,
  page = 1,
  pageSize = 20
): Promise<{
  users: {
    id: string;
    username: string;
    fullName?: string;
    profileImage?: string;
    isFollowing: boolean;
    isCreator: boolean;
    verified: boolean;
  }[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}> {
  return await get<{
    users: {
      id: string;
      username: string;
      fullName?: string;
      profileImage?: string;
      isFollowing: boolean;
      isCreator: boolean;
      verified: boolean;
    }[];
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  }>(USER_ENDPOINTS.SEARCH_USERS, {
    params: {
      query,
      page,
      pageSize,
    },
  });
}
