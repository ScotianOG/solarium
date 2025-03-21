/**
 * Marketplace Service
 * Handles API requests for marketplace-related features
 */

import { get, post, put, del } from '../api-client';

// Types
export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  creatorId: string;
  creatorName: string;
  creatorImage?: string;
  imageUrl: string;
  likes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  status: 'active' | 'sold' | 'auction' | 'inactive';
  collection?: {
    id: string;
    name: string;
  };
}

export interface CollectionData {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  creatorName: string;
  creatorImage?: string;
  coverImage?: string;
  itemCount: number;
  floorPrice?: number;
  totalVolume?: number;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  verified: boolean;
  tags: string[];
}

export interface MarketplaceFilters {
  search?: string;
  collections?: string[];
  priceMin?: number;
  priceMax?: number;
  creator?: string;
  status?: string[];
  sortBy?: 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'popularity';
  tags?: string[];
}

export interface MarketplaceResponse {
  items: MarketplaceItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface CollectionsResponse {
  collections: CollectionData[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

// Endpoints
const MARKETPLACE_ENDPOINTS = {
  ITEMS: '/marketplace/items',
  ITEM_DETAIL: (id: string) => `/marketplace/items/${id}`,
  COLLECTIONS: '/marketplace/collections',
  COLLECTION_DETAIL: (id: string) => `/marketplace/collections/${id}`,
  COLLECTION_ITEMS: (id: string) => `/marketplace/collections/${id}/items`,
  FEATURED_COLLECTIONS: '/marketplace/collections/featured',
  TOP_COLLECTIONS: '/marketplace/collections/top',
  LIKE_ITEM: (id: string) => `/marketplace/items/${id}/like`,
  TAGS: '/marketplace/tags',
  PURCHASE: (id: string) => `/marketplace/items/${id}/purchase`,
  BID: (id: string) => `/marketplace/items/${id}/bid`,
};

/**
 * Get marketplace items with filtering, sorting, and pagination
 */
export async function getMarketplaceItems(
  filters: MarketplaceFilters = {},
  page = 1,
  pageSize = 20
): Promise<MarketplaceResponse> {
  // Convert array parameters to string format
  const params: Record<string, string | number | boolean | undefined | null> = {
    page,
    pageSize,
    search: filters.search,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    creator: filters.creator,
    sortBy: filters.sortBy,
  };
  
  // Handle arrays by joining them into comma-separated strings
  if (filters.collections?.length) {
    params.collections = filters.collections.join(',');
  }
  
  if (filters.status?.length) {
    params.status = filters.status.join(',');
  }
  
  if (filters.tags?.length) {
    params.tags = filters.tags.join(',');
  }

  return await get<MarketplaceResponse>(MARKETPLACE_ENDPOINTS.ITEMS, { params });
}

/**
 * Get marketplace item details by ID
 */
export async function getMarketplaceItem(id: string): Promise<MarketplaceItem> {
  return await get<MarketplaceItem>(MARKETPLACE_ENDPOINTS.ITEM_DETAIL(id));
}

/**
 * Get collections with pagination
 */
export async function getCollections(
  page = 1,
  pageSize = 20,
  filters: Partial<{ search: string; creator: string; tags: string[] }> = {}
): Promise<CollectionsResponse> {
  // Convert array parameters to string format
  const params: Record<string, string | number | boolean | undefined | null> = {
    page,
    pageSize,
    search: filters.search,
    creator: filters.creator,
  };
  
  // Handle tags array by joining into comma-separated string
  if (filters.tags?.length) {
    params.tags = filters.tags.join(',');
  }
  
  return await get<CollectionsResponse>(MARKETPLACE_ENDPOINTS.COLLECTIONS, { params });
}

/**
 * Get collection details by ID
 */
export async function getCollection(id: string): Promise<CollectionData> {
  return await get<CollectionData>(MARKETPLACE_ENDPOINTS.COLLECTION_DETAIL(id));
}

/**
 * Get items in a collection
 */
export async function getCollectionItems(
  collectionId: string,
  page = 1,
  pageSize = 20
): Promise<MarketplaceResponse> {
  return await get<MarketplaceResponse>(
    MARKETPLACE_ENDPOINTS.COLLECTION_ITEMS(collectionId),
    {
      params: {
        page,
        pageSize,
      },
    }
  );
}

/**
 * Get featured collections
 */
export async function getFeaturedCollections(limit = 5): Promise<CollectionData[]> {
  const response = await get<CollectionsResponse>(
    MARKETPLACE_ENDPOINTS.FEATURED_COLLECTIONS,
    {
      params: {
        limit,
      },
    }
  );
  return response.collections;
}

/**
 * Get top collections
 */
export async function getTopCollections(limit = 5): Promise<CollectionData[]> {
  const response = await get<CollectionsResponse>(
    MARKETPLACE_ENDPOINTS.TOP_COLLECTIONS,
    {
      params: {
        limit,
      },
    }
  );
  return response.collections;
}

/**
 * Toggle like on an item
 */
export async function toggleLikeItem(id: string): Promise<{ likes: number; liked: boolean }> {
  return await post<{ likes: number; liked: boolean }>(
    MARKETPLACE_ENDPOINTS.LIKE_ITEM(id)
  );
}

/**
 * Get available tags for marketplace
 */
export async function getMarketplaceTags(): Promise<string[]> {
  return await get<string[]>(MARKETPLACE_ENDPOINTS.TAGS);
}

/**
 * Purchase an item
 */
export async function purchaseItem(
  id: string,
  paymentDetails: any
): Promise<{ success: boolean; transactionId: string }> {
  return await post<{ success: boolean; transactionId: string }>(
    MARKETPLACE_ENDPOINTS.PURCHASE(id),
    paymentDetails
  );
}

/**
 * Place a bid on an auction item
 */
export async function placeBid(
  id: string,
  bidAmount: number
): Promise<{ success: boolean; currentHighestBid: number }> {
  return await post<{ success: boolean; currentHighestBid: number }>(
    MARKETPLACE_ENDPOINTS.BID(id),
    { amount: bidAmount }
  );
}

/**
 * Create a new collection (for creators)
 */
export async function createCollection(
  collectionData: Omit<CollectionData, 'id' | 'creatorId' | 'creatorName' | 'creatorImage' | 'createdAt' | 'updatedAt' | 'itemCount' | 'floorPrice' | 'totalVolume'>
): Promise<CollectionData> {
  return await post<CollectionData>(MARKETPLACE_ENDPOINTS.COLLECTIONS, collectionData);
}

/**
 * Create a new marketplace item (for creators)
 */
export async function createMarketplaceItem(
  itemData: Omit<MarketplaceItem, 'id' | 'creatorId' | 'creatorName' | 'creatorImage' | 'createdAt' | 'updatedAt' | 'likes' | 'views'>
): Promise<MarketplaceItem> {
  return await post<MarketplaceItem>(MARKETPLACE_ENDPOINTS.ITEMS, itemData);
}

/**
 * Update a marketplace item
 */
export async function updateMarketplaceItem(
  id: string,
  itemData: Partial<MarketplaceItem>
): Promise<MarketplaceItem> {
  return await put<MarketplaceItem>(MARKETPLACE_ENDPOINTS.ITEM_DETAIL(id), itemData);
}

/**
 * Delete a marketplace item
 */
export async function deleteMarketplaceItem(id: string): Promise<void> {
  return await del<void>(MARKETPLACE_ENDPOINTS.ITEM_DETAIL(id));
}
