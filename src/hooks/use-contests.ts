import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contestApi } from '@/api/contest';
import { GetContestsParams } from '@/types/contest';

export const contestKeys = {
  all: ['contests'] as const,
  lists: () => [...contestKeys.all, 'list'] as const,
  list: (params: GetContestsParams) => [...contestKeys.lists(), params] as const,
  details: () => [...contestKeys.all, 'detail'] as const,
  detail: (id: number) => [...contestKeys.details(), id] as const,
  myStatus: (id: number) => [...contestKeys.all, 'my-status', id] as const,
  members: (id: number, params?: any) => [...contestKeys.detail(id), 'members', params] as const,
  result: (id: number) => [...contestKeys.detail(id), 'result'] as const,
  comments: (id: number, params?: any) => [...contestKeys.detail(id), 'comments', params] as const,
};

/**
 * Hook to fetch paginated contest list
 */
export function useContests(params: GetContestsParams = {}) {
  return useQuery({
    queryKey: contestKeys.list(params),
    queryFn: () => contestApi.getContests(params),
  });
}

/**
 * Hook to fetch a single contest by ID
 */
export function useContest(id: number) {
  return useQuery({
    queryKey: contestKeys.detail(id),
    queryFn: () => contestApi.getContest(id),
    enabled: !!id,
  });
}

/**
 * Hook to fetch user's application status for a specific contest
 */
export function useMyContestStatus(id: number) {
  return useQuery({
    queryKey: contestKeys.myStatus(id),
    queryFn: () => contestApi.getMyApplicationStatus(id),
    enabled: !!id,
  });
}

/**
 * Hook to apply for a contest
 */
export function useApplyToContest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contestId, data }: { contestId: number; data?: any }) => 
      contestApi.applyToContest(contestId, data),
    onSuccess: (_, { contestId }) => {
      queryClient.invalidateQueries({ queryKey: contestKeys.myStatus(contestId) });
      queryClient.invalidateQueries({ queryKey: contestKeys.detail(contestId) });
    },
  });
}

/**
 * Hook to cancel application
 */
export function useCancelApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contestId: number) => contestApi.cancelApplication(contestId),
    onSuccess: (_, contestId) => {
      queryClient.invalidateQueries({ queryKey: contestKeys.myStatus(contestId) });
      queryClient.invalidateQueries({ queryKey: contestKeys.detail(contestId) });
    },
  });
}

/**
 * Hook to withdraw from a contest
 */
export function useWithdrawFromContest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contestId: number) => contestApi.withdrawFromContest(contestId),
    onSuccess: (_, contestId) => {
      queryClient.invalidateQueries({ queryKey: contestKeys.myStatus(contestId) });
      queryClient.invalidateQueries({ queryKey: contestKeys.detail(contestId) });
    },
  });
}

/**
 * Hook to fetch contest members
 */
export function useContestMembers(contestId: number, params?: { page?: number; page_size?: number; sort_by?: string; order?: string }) {
  return useQuery({
    queryKey: contestKeys.members(contestId, params),
    queryFn: () => contestApi.getContestMembers(contestId, params),
    enabled: !!contestId,
  });
}

/**
 * Hook to fetch contest results/bracket
 */
export function useContestResult(contestId: number) {
  return useQuery({
    queryKey: contestKeys.result(contestId),
    queryFn: () => contestApi.getContestResult(contestId),
    enabled: !!contestId,
  });
}

/**
 * Hook to fetch contest comments
 */
export function useContestComments(contestId: number, params?: { page?: number; page_size?: number; sort_by?: string; order?: string }) {
  return useQuery({
    queryKey: contestKeys.comments(contestId, params),
    queryFn: () => contestApi.getContestComments(contestId, params),
    enabled: !!contestId,
  });
}

/**
 * Hook to create a contest comment
 */
export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contestId, content }: { contestId: number; content: string }) => 
      contestApi.createComment(contestId, { content }),
    onSuccess: (_, { contestId }) => {
      queryClient.invalidateQueries({ queryKey: contestKeys.comments(contestId) });
    },
  });
}
