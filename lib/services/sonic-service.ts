/**
 * Sonic Service
 * Handles API requests for Sonic DEX related features like 
 * swaps, liquidity provision, and farming on the Sonic platform
 */

import { get, post, put, del } from '../api-client';
import type { 
  SwapQuote, 
  SwapResult, 
  LiquidityPosition, 
  LiquidityPoolInfo,
  StakingPosition 
} from './wallet-service';

// Sonic-specific types
export interface SonicPool {
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
  sonicRewards: boolean; // Whether this pool has Sonic rewards
  boostMultiplier?: number; // Multiplier for Sonic rewards if applicable
}

export interface SonicFarm {
  id: string;
  name: string;
  poolId: string;
  token0Symbol: string;
  token1Symbol: string;
  rewardToken: string;
  rewardTokenSymbol: string;
  rewardTokenLogo?: string;
  apr: number;
  totalStaked: string;
  usdTotalStaked: number;
  startDate: string;
  endDate?: string;
  lockPeriod?: number; // in seconds, 0 if no lock
}

export interface SonicPosition {
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
  sonicRewards: {
    amount: string;
    usdValue: number;
    claimable: boolean;
  };
  otherRewards: {
    token: string;
    symbol: string;
    amount: string;
    usdValue: number;
    claimable: boolean;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface SonicFarmPosition {
  id: string;
  farmId: string;
  farmName: string;
  positionId: string;
  token0Symbol: string;
  token1Symbol: string;
  stakedAmount: string; // LP tokens
  usdValue: number;
  share: number; // Percentage share of the farm
  rewardsEarned: string;
  rewardsSymbol: string;
  rewardsUsdValue: number;
  apr: number;
  unlockDate?: string; // ISO date string, null if no lock
  createdAt: string;
  updatedAt: string;
}

// Endpoints
const SONIC_ENDPOINTS = {
  SWAP_QUOTE: '/sonic/swap/quote',
  SWAP_EXECUTE: '/sonic/swap/execute',
  SUPPORTED_TOKENS: '/sonic/tokens',
  POOLS: '/sonic/pools',
  POSITIONS: '/sonic/positions',
  ADD_LIQUIDITY: '/sonic/liquidity/add',
  REMOVE_LIQUIDITY: '/sonic/liquidity/remove',
  CLAIM_REWARDS: (positionId: string) => `/sonic/positions/${positionId}/claim`,
  FARMS: '/sonic/farms',
  FARM_POSITIONS: '/sonic/farms/positions',
  STAKE_TO_FARM: '/sonic/farms/stake',
  UNSTAKE_FROM_FARM: '/sonic/farms/unstake',
  CLAIM_FARM_REWARDS: (positionId: string) => `/sonic/farms/positions/${positionId}/claim`,
  STATS: '/sonic/stats',
};

/**
 * Get swap quote from Sonic DEX
 */
export async function getSonicSwapQuote(
  tokenIn: string,
  tokenOut: string,
  amountIn: string,
  slippage = 0.5 // Default slippage tolerance 0.5%
): Promise<SwapQuote & { sonicFeeBps: number }> {
  return await get<SwapQuote & { sonicFeeBps: number }>(SONIC_ENDPOINTS.SWAP_QUOTE, {
    params: {
      tokenIn,
      tokenOut,
      amountIn,
      slippage,
    },
  });
}

/**
 * Execute a token swap on Sonic DEX
 */
export async function executeSonicSwap(
  tokenIn: string,
  tokenOut: string,
  amountIn: string,
  minAmountOut: string,
  slippage = 0.5
): Promise<SwapResult & { sonicFee: string }> {
  return await post<SwapResult & { sonicFee: string }>(SONIC_ENDPOINTS.SWAP_EXECUTE, {
    tokenIn,
    tokenOut,
    amountIn,
    minAmountOut,
    slippage,
  });
}

/**
 * Get list of tokens supported on Sonic DEX
 */
export async function getSonicSupportedTokens(): Promise<{
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoUrl?: string;
}[]> {
  return await get<{
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    logoUrl?: string;
  }[]>(SONIC_ENDPOINTS.SUPPORTED_TOKENS);
}

/**
 * Get available Sonic liquidity pools information
 */
export async function getSonicPools(): Promise<SonicPool[]> {
  return await get<SonicPool[]>(SONIC_ENDPOINTS.POOLS);
}

/**
 * Get user's Sonic liquidity positions
 */
export async function getSonicPositions(): Promise<SonicPosition[]> {
  return await get<SonicPosition[]>(SONIC_ENDPOINTS.POSITIONS);
}

/**
 * Add liquidity to a Sonic pool
 */
export async function addSonicLiquidity(
  poolId: string,
  token0Amount: string,
  token1Amount: string,
  slippage = 0.5
): Promise<{
  success: boolean;
  transaction: {
    id: string;
    hash: string;
    status: 'pending' | 'confirmed' | 'failed';
  };
  positionId: string;
}> {
  return await post<{
    success: boolean;
    transaction: {
      id: string;
      hash: string;
      status: 'pending' | 'confirmed' | 'failed';
    };
    positionId: string;
  }>(SONIC_ENDPOINTS.ADD_LIQUIDITY, {
    poolId,
    token0Amount,
    token1Amount,
    slippage,
  });
}

/**
 * Remove liquidity from a Sonic position
 */
export async function removeSonicLiquidity(
  positionId: string,
  percentage: number, // 0-100
  slippage = 0.5
): Promise<{
  success: boolean;
  transaction: {
    id: string;
    hash: string;
    status: 'pending' | 'confirmed' | 'failed';
  };
}> {
  return await post<{
    success: boolean;
    transaction: {
      id: string;
      hash: string;
      status: 'pending' | 'confirmed' | 'failed';
    };
  }>(SONIC_ENDPOINTS.REMOVE_LIQUIDITY, {
    positionId,
    percentage,
    slippage,
  });
}

/**
 * Claim rewards from a Sonic liquidity position
 */
export async function claimSonicRewards(
  positionId: string
): Promise<{
  success: boolean;
  transaction: {
    id: string;
    hash: string;
    status: 'pending' | 'confirmed' | 'failed';
  };
  sonicRewards: {
    amount: string;
    usdValue: number;
  };
  otherRewards: {
    token: string;
    symbol: string;
    amount: string;
    usdValue: number;
  }[];
}> {
  return await post<{
    success: boolean;
    transaction: {
      id: string;
      hash: string;
      status: 'pending' | 'confirmed' | 'failed';
    };
    sonicRewards: {
      amount: string;
      usdValue: number;
    };
    otherRewards: {
      token: string;
      symbol: string;
      amount: string;
      usdValue: number;
    }[];
  }>(SONIC_ENDPOINTS.CLAIM_REWARDS(positionId));
}

/**
 * Get available Sonic farms
 */
export async function getSonicFarms(): Promise<SonicFarm[]> {
  return await get<SonicFarm[]>(SONIC_ENDPOINTS.FARMS);
}

/**
 * Get user's Sonic farm positions
 */
export async function getSonicFarmPositions(): Promise<SonicFarmPosition[]> {
  return await get<SonicFarmPosition[]>(SONIC_ENDPOINTS.FARM_POSITIONS);
}

/**
 * Stake LP tokens to a Sonic farm
 */
export async function stakeToSonicFarm(
  farmId: string,
  positionId: string,
  amount: string
): Promise<{
  success: boolean;
  transaction: {
    id: string;
    hash: string;
    status: 'pending' | 'confirmed' | 'failed';
  };
  farmPositionId: string;
}> {
  return await post<{
    success: boolean;
    transaction: {
      id: string;
      hash: string;
      status: 'pending' | 'confirmed' | 'failed';
    };
    farmPositionId: string;
  }>(SONIC_ENDPOINTS.STAKE_TO_FARM, {
    farmId,
    positionId,
    amount,
  });
}

/**
 * Unstake LP tokens from a Sonic farm
 */
export async function unstakeFromSonicFarm(
  farmPositionId: string,
  amount: string
): Promise<{
  success: boolean;
  transaction: {
    id: string;
    hash: string;
    status: 'pending' | 'confirmed' | 'failed';
  };
}> {
  return await post<{
    success: boolean;
    transaction: {
      id: string;
      hash: string;
      status: 'pending' | 'confirmed' | 'failed';
    };
  }>(SONIC_ENDPOINTS.UNSTAKE_FROM_FARM, {
    farmPositionId,
    amount,
  });
}

/**
 * Claim rewards from a Sonic farm position
 */
export async function claimSonicFarmRewards(
  farmPositionId: string
): Promise<{
  success: boolean;
  transaction: {
    id: string;
    hash: string;
    status: 'pending' | 'confirmed' | 'failed';
  };
  rewards: {
    token: string;
    symbol: string;
    amount: string;
    usdValue: number;
  };
}> {
  return await post<{
    success: boolean;
    transaction: {
      id: string;
      hash: string;
      status: 'pending' | 'confirmed' | 'failed';
    };
    rewards: {
      token: string;
      symbol: string;
      amount: string;
      usdValue: number;
    };
  }>(SONIC_ENDPOINTS.CLAIM_FARM_REWARDS(farmPositionId));
}

/**
 * Get Sonic DEX statistics
 */
export async function getSonicStats(): Promise<{
  tvl: string; // Total value locked
  usdTvl: number;
  volume24h: string;
  usdVolume24h: number;
  volume7d: string;
  usdVolume7d: number;
  sonicPrice: number;
  sonicMarketCap: number;
  sonicCirculatingSupply: string;
  totalPools: number;
  totalFarms: number;
  totalUsers: number;
}> {
  return await get<{
    tvl: string;
    usdTvl: number;
    volume24h: string;
    usdVolume24h: number;
    volume7d: string;
    usdVolume7d: number;
    sonicPrice: number;
    sonicMarketCap: number;
    sonicCirculatingSupply: string;
    totalPools: number;
    totalFarms: number;
    totalUsers: number;
  }>(SONIC_ENDPOINTS.STATS);
}
