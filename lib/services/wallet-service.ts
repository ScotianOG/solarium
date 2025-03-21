/**
 * Wallet Service
 * Handles API requests for wallet-related features like 
 * transactions, crypto balances, and blockchain operations
 */

import { get, post, put, del } from '../api-client';

// Types
export interface WalletBalance {
  token: string;
  symbol: string;
  amount: string; // String for precise representation of large numbers
  usdValue: number;
  chain: string;
  logoUrl?: string;
}

export interface Transaction {
  id: string;
  type: 'swap' | 'liquidity' | 'stake' | 'unstake' | 'transfer' | 'receive' | 'nft_purchase' | 'nft_sale';
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
  hash: string;
  chain: string;
  from: string;
  to: string;
  amount: string; // String for precise representation of large numbers
  tokenSymbol: string;
  usdValue: number;
  fee: {
    amount: string;
    usdValue: number;
    tokenSymbol: string;
  };
  metadata?: Record<string, any>;
}

export interface SwapQuote {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut: string;
  priceImpact: number;
  route: {
    protocol: string;
    hops: {
      pool: string;
      tokenIn: string;
      tokenOut: string;
      fee: number;
    }[];
  };
  estimatedGas: string;
  estimatedTime: number; // in seconds
  validUntil: string;
}

export interface SwapResult {
  success: boolean;
  transaction: Transaction;
  tokenInSymbol: string;
  tokenOutSymbol: string;
  amountIn: string;
  amountOut: string;
  rate: string;
}

export interface LiquidityPosition {
  id: string;
  poolId: string;
  poolName: string;
  poolAddress: string;
  token0Symbol: string;
  token1Symbol: string;
  token0Logo?: string;
  token1Logo?: string;
  token0Amount: string;
  token1Amount: string;
  usdValue: number;
  share: number; // Percentage share of the pool
  apr: number;
  rewards: {
    token: string;
    symbol: string;
    amount: string;
    usdValue: number;
    claimable: boolean;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface LiquidityPoolInfo {
  id: string;
  name: string;
  address: string;
  token0Symbol: string;
  token1Symbol: string;
  token0Logo?: string;
  token1Logo?: string;
  token0Address: string;
  token1Address: string;
  tvl: string; // Total value locked
  usdTvl: number;
  apr: number;
  volume24h: string;
  volume7d: string;
  feeTier: number; // in basis points
  swapFee: number; // in basis points
}

export interface StakingPosition {
  id: string;
  token: string;
  symbol: string;
  logoUrl?: string;
  amount: string;
  usdValue: number;
  apr: number;
  rewards: {
    token: string;
    symbol: string;
    amount: string;
    usdValue: number;
    claimable: boolean;
  }[];
  lockPeriod: number; // in seconds, 0 if no lock
  unlockDate?: string; // ISO date string, null if no lock
  createdAt: string;
  updatedAt: string;
}

// Endpoints
const WALLET_ENDPOINTS = {
  BALANCES: '/wallet/balances',
  TRANSACTIONS: '/wallet/transactions',
  SWAP_QUOTE: '/wallet/swap/quote',
  SWAP_EXECUTE: '/wallet/swap/execute',
  SWAP_TOKENS: '/wallet/swap/tokens',
  LIQUIDITY_POSITIONS: '/wallet/liquidity/positions',
  LIQUIDITY_POOLS: '/wallet/liquidity/pools',
  LIQUIDITY_ADD: '/wallet/liquidity/add',
  LIQUIDITY_REMOVE: '/wallet/liquidity/remove',
  LIQUIDITY_CLAIM_REWARDS: (positionId: string) => `/wallet/liquidity/positions/${positionId}/claim`,
  STAKING_POSITIONS: '/wallet/staking/positions',
  STAKING_OPTIONS: '/wallet/staking/options',
  STAKING_STAKE: '/wallet/staking/stake',
  STAKING_UNSTAKE: '/wallet/staking/unstake',
  STAKING_CLAIM_REWARDS: (positionId: string) => `/wallet/staking/positions/${positionId}/claim`,
  CHAINS: '/wallet/chains',
  SUPPORTED_TOKENS: '/wallet/tokens',
  TOKEN_PRICE: (symbol: string) => `/wallet/tokens/${symbol}/price`,
};

/**
 * Get user's wallet balances
 */
export async function getWalletBalances(chain?: string): Promise<WalletBalance[]> {
  const params: Record<string, string | number | boolean | undefined | null> = {};
  
  if (chain) {
    params.chain = chain;
  }
  
  return await get<WalletBalance[]>(WALLET_ENDPOINTS.BALANCES, { params });
}

/**
 * Get user's transaction history
 */
export async function getTransactions(
  page = 1,
  pageSize = 20,
  filters: {
    type?: string[];
    status?: string[];
    startDate?: string;
    endDate?: string;
    chain?: string;
  } = {}
): Promise<{
  transactions: Transaction[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}> {
  // Convert array parameters to string format
  const params: Record<string, string | number | boolean | undefined | null> = {
    page,
    pageSize,
    startDate: filters.startDate,
    endDate: filters.endDate,
    chain: filters.chain,
  };
  
  // Handle arrays by joining them into comma-separated strings
  if (filters.type?.length) {
    params.type = filters.type.join(',');
  }
  
  if (filters.status?.length) {
    params.status = filters.status.join(',');
  }
  
  return await get<{
    transactions: Transaction[];
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  }>(WALLET_ENDPOINTS.TRANSACTIONS, { params });
}

/**
 * Get swap quote for token exchange
 */
export async function getSwapQuote(
  tokenIn: string,
  tokenOut: string,
  amountIn: string,
  slippage = 0.5, // Default slippage tolerance 0.5%
  chain?: string
): Promise<SwapQuote> {
  const params: Record<string, string | number | boolean | undefined | null> = {
    tokenIn,
    tokenOut,
    amountIn,
    slippage,
  };
  
  if (chain) {
    params.chain = chain;
  }
  
  return await get<SwapQuote>(WALLET_ENDPOINTS.SWAP_QUOTE, { params });
}

/**
 * Execute a token swap
 */
export async function executeSwap(
  tokenIn: string,
  tokenOut: string,
  amountIn: string,
  minAmountOut: string,
  slippage = 0.5,
  chain?: string
): Promise<SwapResult> {
  return await post<SwapResult>(WALLET_ENDPOINTS.SWAP_EXECUTE, {
    tokenIn,
    tokenOut,
    amountIn,
    minAmountOut,
    slippage,
    chain,
  });
}

/**
 * Get list of supported tokens for swapping
 */
export async function getSupportedSwapTokens(chain?: string): Promise<{
  token: string;
  symbol: string;
  name: string;
  decimals: number;
  logoUrl?: string;
  chain: string;
}[]> {
  const params: Record<string, string | number | boolean | undefined | null> = {};
  
  if (chain) {
    params.chain = chain;
  }
  
  return await get<{
    token: string;
    symbol: string;
    name: string;
    decimals: number;
    logoUrl?: string;
    chain: string;
  }[]>(WALLET_ENDPOINTS.SWAP_TOKENS, { params });
}

/**
 * Get user's liquidity positions
 */
export async function getLiquidityPositions(): Promise<LiquidityPosition[]> {
  return await get<LiquidityPosition[]>(WALLET_ENDPOINTS.LIQUIDITY_POSITIONS);
}

/**
 * Get available liquidity pools information
 */
export async function getLiquidityPools(
  chain?: string
): Promise<LiquidityPoolInfo[]> {
  const params: Record<string, string | number | boolean | undefined | null> = {};
  
  if (chain) {
    params.chain = chain;
  }
  
  return await get<LiquidityPoolInfo[]>(WALLET_ENDPOINTS.LIQUIDITY_POOLS, { params });
}

/**
 * Add liquidity to a pool
 */
export async function addLiquidity(
  poolId: string,
  token0Amount: string,
  token1Amount: string,
  slippage = 0.5
): Promise<{
  success: boolean;
  transaction: Transaction;
  positionId: string;
}> {
  return await post<{
    success: boolean;
    transaction: Transaction;
    positionId: string;
  }>(WALLET_ENDPOINTS.LIQUIDITY_ADD, {
    poolId,
    token0Amount,
    token1Amount,
    slippage,
  });
}

/**
 * Remove liquidity from a position
 */
export async function removeLiquidity(
  positionId: string,
  percentage: number, // 0-100
  slippage = 0.5
): Promise<{
  success: boolean;
  transaction: Transaction;
}> {
  return await post<{
    success: boolean;
    transaction: Transaction;
  }>(WALLET_ENDPOINTS.LIQUIDITY_REMOVE, {
    positionId,
    percentage,
    slippage,
  });
}

/**
 * Claim rewards from a liquidity position
 */
export async function claimLiquidityRewards(
  positionId: string
): Promise<{
  success: boolean;
  transaction: Transaction;
  rewards: {
    token: string;
    symbol: string;
    amount: string;
    usdValue: number;
  }[];
}> {
  return await post<{
    success: boolean;
    transaction: Transaction;
    rewards: {
      token: string;
      symbol: string;
      amount: string;
      usdValue: number;
    }[];
  }>(WALLET_ENDPOINTS.LIQUIDITY_CLAIM_REWARDS(positionId));
}

/**
 * Get user's staking positions
 */
export async function getStakingPositions(): Promise<StakingPosition[]> {
  return await get<StakingPosition[]>(WALLET_ENDPOINTS.STAKING_POSITIONS);
}

/**
 * Get available staking options
 */
export async function getStakingOptions(): Promise<{
  token: string;
  symbol: string;
  name: string;
  logoUrl?: string;
  apr: number;
  lockPeriodOptions: {
    days: number;
    apr: number;
  }[];
  minAmount: string;
  maxAmount?: string;
  rewards: {
    token: string;
    symbol: string;
  }[];
}[]> {
  return await get<{
    token: string;
    symbol: string;
    name: string;
    logoUrl?: string;
    apr: number;
    lockPeriodOptions: {
      days: number;
      apr: number;
    }[];
    minAmount: string;
    maxAmount?: string;
    rewards: {
      token: string;
      symbol: string;
    }[];
  }[]>(WALLET_ENDPOINTS.STAKING_OPTIONS);
}

/**
 * Stake tokens
 */
export async function stakeTokens(
  token: string,
  amount: string,
  lockPeriodDays = 0
): Promise<{
  success: boolean;
  transaction: Transaction;
  positionId: string;
}> {
  return await post<{
    success: boolean;
    transaction: Transaction;
    positionId: string;
  }>(WALLET_ENDPOINTS.STAKING_STAKE, {
    token,
    amount,
    lockPeriodDays,
  });
}

/**
 * Unstake tokens
 */
export async function unstakeTokens(
  positionId: string,
  amount: string
): Promise<{
  success: boolean;
  transaction: Transaction;
}> {
  return await post<{
    success: boolean;
    transaction: Transaction;
  }>(WALLET_ENDPOINTS.STAKING_UNSTAKE, {
    positionId,
    amount,
  });
}

/**
 * Claim staking rewards
 */
export async function claimStakingRewards(
  positionId: string
): Promise<{
  success: boolean;
  transaction: Transaction;
  rewards: {
    token: string;
    symbol: string;
    amount: string;
    usdValue: number;
  }[];
}> {
  return await post<{
    success: boolean;
    transaction: Transaction;
    rewards: {
      token: string;
      symbol: string;
      amount: string;
      usdValue: number;
    }[];
  }>(WALLET_ENDPOINTS.STAKING_CLAIM_REWARDS(positionId));
}

/**
 * Get supported blockchain networks
 */
export async function getSupportedChains(): Promise<{
  id: string;
  name: string;
  shortName: string;
  isTestnet: boolean;
  logoUrl?: string;
  nativeCurrency: {
    symbol: string;
    name: string;
    decimals: number;
  };
  blockExplorerUrl: string;
}[]> {
  return await get<{
    id: string;
    name: string;
    shortName: string;
    isTestnet: boolean;
    logoUrl?: string;
    nativeCurrency: {
      symbol: string;
      name: string;
      decimals: number;
    };
    blockExplorerUrl: string;
  }[]>(WALLET_ENDPOINTS.CHAINS);
}

/**
 * Get supported tokens
 */
export async function getSupportedTokens(chain?: string): Promise<{
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoUrl?: string;
  chain: string;
}[]> {
  const params: Record<string, string | number | boolean | undefined | null> = {};
  
  if (chain) {
    params.chain = chain;
  }
  
  return await get<{
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    logoUrl?: string;
    chain: string;
  }[]>(WALLET_ENDPOINTS.SUPPORTED_TOKENS, { params });
}

/**
 * Get token price
 */
export async function getTokenPrice(
  symbol: string
): Promise<{
  symbol: string;
  usdPrice: number;
  change24h: number;
  high24h: number;
  low24h: number;
  marketCap?: number;
  volume24h?: number;
}> {
  return await get<{
    symbol: string;
    usdPrice: number;
    change24h: number;
    high24h: number;
    low24h: number;
    marketCap?: number;
    volume24h?: number;
  }>(WALLET_ENDPOINTS.TOKEN_PRICE(symbol));
}
