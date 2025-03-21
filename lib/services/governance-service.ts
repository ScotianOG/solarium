/**
 * Governance Service
 * Handles API requests for governance-related features like proposals and voting
 */

import { get, post, put, del } from '../api-client';

// Types
export interface Proposal {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creatorName: string;
  creatorImage?: string;
  status: 'draft' | 'active' | 'passed' | 'rejected' | 'canceled' | 'executed';
  startDate: string;
  endDate: string;
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  quorum: number;
  executionTimestamp?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  contents: ProposalContent[];
}

export interface ProposalContent {
  type: 'text' | 'image' | 'link' | 'code' | 'action';
  content: string;
  metadata?: Record<string, any>;
}

export interface ProposalVote {
  proposalId: string;
  userId: string;
  vote: 'for' | 'against' | 'abstain';
  votingPower: number;
  timestamp: string;
}

export interface VotingPower {
  total: number;
  available: number;
  staked: number;
  breakdown: {
    tokenHoldings: number;
    stakedTokens: number;
    nftMultiplier: number;
    delegatedToUser: number;
    delegatedByUser: number;
  };
}

export interface ProposalListResponse {
  proposals: Proposal[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface ProposalFilters {
  status?: ('draft' | 'active' | 'passed' | 'rejected' | 'canceled' | 'executed')[];
  creator?: string;
  search?: string;
  startDateFrom?: string;
  startDateTo?: string;
  endDateFrom?: string;
  endDateTo?: string;
  tags?: string[];
  sortBy?: 'newest' | 'oldest' | 'most_votes' | 'end_date';
}

// Endpoints
const GOVERNANCE_ENDPOINTS = {
  PROPOSALS: '/governance/proposals',
  PROPOSAL_DETAIL: (id: string) => `/governance/proposals/${id}`,
  VOTE: (id: string) => `/governance/proposals/${id}/vote`,
  VOTES: (id: string) => `/governance/proposals/${id}/votes`,
  USER_VOTES: '/governance/user/votes',
  VOTING_POWER: '/governance/user/voting-power',
  DELEGATE: '/governance/delegate',
  TAGS: '/governance/tags',
  EXECUTE_PROPOSAL: (id: string) => `/governance/proposals/${id}/execute`,
  CANCEL_PROPOSAL: (id: string) => `/governance/proposals/${id}/cancel`,
};

/**
 * Get list of proposals with filtering and pagination
 */
export async function getProposals(
  filters: ProposalFilters = {},
  page = 1,
  pageSize = 20
): Promise<ProposalListResponse> {
  // Convert array parameters to string format
  const params: Record<string, string | number | boolean | undefined | null> = {
    page,
    pageSize,
    search: filters.search,
    creator: filters.creator,
    startDateFrom: filters.startDateFrom,
    startDateTo: filters.startDateTo,
    endDateFrom: filters.endDateFrom,
    endDateTo: filters.endDateTo,
    sortBy: filters.sortBy,
  };
  
  // Handle arrays by joining them into comma-separated strings
  if (filters.status?.length) {
    params.status = filters.status.join(',');
  }
  
  if (filters.tags?.length) {
    params.tags = filters.tags.join(',');
  }

  return await get<ProposalListResponse>(GOVERNANCE_ENDPOINTS.PROPOSALS, { params });
}

/**
 * Get proposal details by ID
 */
export async function getProposal(id: string): Promise<Proposal> {
  return await get<Proposal>(GOVERNANCE_ENDPOINTS.PROPOSAL_DETAIL(id));
}

/**
 * Create a new proposal
 */
export async function createProposal(
  proposalData: Omit<Proposal, 'id' | 'creatorId' | 'creatorName' | 'creatorImage' | 'status' | 'votesFor' | 'votesAgainst' | 'votesAbstain' | 'createdAt' | 'updatedAt' | 'executionTimestamp'>
): Promise<Proposal> {
  return await post<Proposal>(GOVERNANCE_ENDPOINTS.PROPOSALS, proposalData);
}

/**
 * Update a draft proposal
 */
export async function updateProposal(
  id: string,
  proposalData: Partial<Proposal>
): Promise<Proposal> {
  return await put<Proposal>(GOVERNANCE_ENDPOINTS.PROPOSAL_DETAIL(id), proposalData);
}

/**
 * Vote on a proposal
 */
export async function voteOnProposal(
  proposalId: string,
  vote: 'for' | 'against' | 'abstain'
): Promise<{
  success: boolean;
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  yourVote: 'for' | 'against' | 'abstain';
  yourVotingPower: number;
}> {
  return await post<{
    success: boolean;
    votesFor: number;
    votesAgainst: number;
    votesAbstain: number;
    yourVote: 'for' | 'against' | 'abstain';
    yourVotingPower: number;
  }>(GOVERNANCE_ENDPOINTS.VOTE(proposalId), { vote });
}

/**
 * Get votes for a proposal
 */
export async function getProposalVotes(
  proposalId: string,
  page = 1,
  pageSize = 20
): Promise<{
  votes: ProposalVote[];
  summary: {
    totalVotes: number;
    votesFor: number;
    votesAgainst: number;
    votesAbstain: number;
  };
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}> {
  return await get<{
    votes: ProposalVote[];
    summary: {
      totalVotes: number;
      votesFor: number;
      votesAgainst: number;
      votesAbstain: number;
    };
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  }>(GOVERNANCE_ENDPOINTS.VOTES(proposalId), {
    params: {
      page,
      pageSize,
    },
  });
}

/**
 * Get current user's voting power
 */
export async function getUserVotingPower(): Promise<VotingPower> {
  return await get<VotingPower>(GOVERNANCE_ENDPOINTS.VOTING_POWER);
}

/**
 * Get user's voting history
 */
export async function getUserVotingHistory(
  page = 1,
  pageSize = 20
): Promise<{
  votes: (ProposalVote & { proposalTitle: string })[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}> {
  return await get<{
    votes: (ProposalVote & { proposalTitle: string })[];
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  }>(GOVERNANCE_ENDPOINTS.USER_VOTES, {
    params: {
      page,
      pageSize,
    },
  });
}

/**
 * Delegate voting power to another user
 */
export async function delegateVotingPower(
  targetUserId: string,
  amount: number
): Promise<{
  success: boolean;
  newVotingPower: VotingPower;
}> {
  return await post<{
    success: boolean;
    newVotingPower: VotingPower;
  }>(GOVERNANCE_ENDPOINTS.DELEGATE, {
    targetUserId,
    amount,
  });
}

/**
 * Get governance tags for filtering
 */
export async function getGovernanceTags(): Promise<string[]> {
  return await get<string[]>(GOVERNANCE_ENDPOINTS.TAGS);
}

/**
 * Execute a passed proposal
 */
export async function executeProposal(
  proposalId: string
): Promise<{
  success: boolean;
  executionTimestamp: string;
  status: 'executed';
}> {
  return await post<{
    success: boolean;
    executionTimestamp: string;
    status: 'executed';
  }>(GOVERNANCE_ENDPOINTS.EXECUTE_PROPOSAL(proposalId));
}

/**
 * Cancel a proposal (only possible by the creator or admin)
 */
export async function cancelProposal(
  proposalId: string,
  reason: string
): Promise<{
  success: boolean;
  status: 'canceled';
}> {
  return await post<{
    success: boolean;
    status: 'canceled';
  }>(GOVERNANCE_ENDPOINTS.CANCEL_PROPOSAL(proposalId), {
    reason,
  });
}

/**
 * Delete a draft proposal (only possible by the creator or admin)
 */
export async function deleteProposal(proposalId: string): Promise<void> {
  return await del<void>(GOVERNANCE_ENDPOINTS.PROPOSAL_DETAIL(proposalId));
}
