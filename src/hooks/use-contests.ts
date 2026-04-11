import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contestApi } from '@/api/contest';
import { 
  GetContestsParams, 
  CreateContestRequest, 
  UpdateContestRequest, 
  GetMyContestsParams,
  RequestParticipateRequest,
  ChangeMemberRoleRequest
} from '@/types/contest';

export const contestKeys = {
  all: ['contests'] as const,
  lists: () => [...contestKeys.all, 'list'] as const,
  list: (params: GetContestsParams) => [...contestKeys.lists(), params] as const,
  details: () => [...contestKeys.all, 'detail'] as const,
  detail: (id: number) => [...contestKeys.details(), id] as const,
  myStatus: (id: number) => [...contestKeys.all, 'my-status', id] as const,
  myApplications: () => [...contestKeys.all, 'my-applications'] as const,
  myApplication: (id: number) => [...contestKeys.myApplications(), id] as const,
  applications: (id: number) => [...contestKeys.detail(id), 'applications'] as const,
  members: (id: number, params?: any) => [...contestKeys.detail(id), 'members', params] as const,
  result: (id: number) => [...contestKeys.detail(id), 'result'] as const,
  comments: (id: number, params?: any) => [...contestKeys.detail(id), 'comments', params] as const,
  myContests: (params: GetMyContestsParams) => [...contestKeys.all, 'me', params] as const,
};

/**
 * Hook to fetch paginated contest list
 */
export function useContests(params: GetContestsParams = {}) {
  return useQuery({
    queryKey: contestKeys.list(params),
    queryFn: async () => {
      return contestApi.getContests(params);
    },
  });
}

/**
 * Hook to fetch a single contest by ID
 */
export function useContest(id: number) {
  return useQuery({
    queryKey: contestKeys.detail(id),
    queryFn: async () => {
      return contestApi.getContest(id);
    },
    enabled: !!id,
  });
}

/**
 * Hook to fetch my contests
 */
export function useMyContests(params: GetMyContestsParams = {}) {
  return useQuery({
    queryKey: contestKeys.myContests(params),
    queryFn: async () => {
      return contestApi.getMyContests(params);
    },
  });
}

/**
 * Hook to create a contest
 */
export function useCreateContest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateContestRequest) => contestApi.createContest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contestKeys.lists() });
    },
  });
}

/**
 * Hook to update a contest
 */
export function useUpdateContest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateContestRequest }) => 
      contestApi.updateContest(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: contestKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: contestKeys.lists() });
    },
  });
}

/**
 * Hook to delete a contest
 */
export function useDeleteContest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => contestApi.deleteContest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contestKeys.lists() });
    },
  });
}

/**
 * Hook to start a contest
 */
export function useStartContest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => contestApi.startContest(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: contestKeys.detail(id) });
    },
  });
}

/**
 * Hook to stop a contest
 */
export function useStopContest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => contestApi.stopContest(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: contestKeys.detail(id) });
    },
  });
}

/**
 * Hook to upload contest thumbnail
 */
export function useUploadThumbnail() {
  return useMutation({
    mutationFn: ({ id, file }: { id: number; file: File }) => 
      contestApi.uploadThumbnail(id, file),
  });
}

/**
 * Hook to fetch user's participation status for a specific contest
 */
export function useMyContestStatus(id: number) {
  return useQuery({
    queryKey: contestKeys.myStatus(id),
    queryFn: async () => {
      return contestApi.getMyContestStatus(id);
    },
    enabled: !!id,
  });
}

/**
 * Hook to apply for a contest
 */
export function useApplyToContest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contestId, data }: { contestId: number; data?: RequestParticipateRequest }) => 
      contestApi.applyToContest(contestId, data),
    onSuccess: (_, { contestId }) => {
      queryClient.invalidateQueries({ queryKey: contestKeys.myStatus(contestId) });
      queryClient.invalidateQueries({ queryKey: contestKeys.detail(contestId) });
    },
  });
}

/**
 * Hook to fetch applications for a contest
 */
export function useContestApplications(contestId: number) {
  return useQuery({
    queryKey: contestKeys.applications(contestId),
    queryFn: async () => {
      return contestApi.getApplications(contestId);
    },
    enabled: !!contestId,
  });
}

/**
 * Hook to accept an application
 */
export function useAcceptApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contestId, userId }: { contestId: number; userId: number }) => 
      contestApi.acceptApplication(contestId, userId),
    onSuccess: (_, { contestId }) => {
      queryClient.invalidateQueries({ queryKey: contestKeys.applications(contestId) });
      queryClient.invalidateQueries({ queryKey: contestKeys.members(contestId) });
    },
  });
}

/**
 * Hook to reject an application
 */
export function useRejectApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contestId, userId }: { contestId: number; userId: number }) => 
      contestApi.rejectApplication(contestId, userId),
    onSuccess: (_, { contestId }) => {
      queryClient.invalidateQueries({ queryKey: contestKeys.applications(contestId) });
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
      queryClient.invalidateQueries({ queryKey: contestKeys.members(contestId) });
    },
  });
}

/**
 * Hook to fetch contest members
 */
export function useContestMembers(contestId: number, params?: { page?: number; page_size?: number; sort_by?: string; order?: string }) {
  return useQuery({
    queryKey: contestKeys.members(contestId, params),
    queryFn: async () => {
      return contestApi.getContestMembers(contestId, params);
    },
    enabled: !!contestId,
  });
}

/**
 * Hook to change a member's role
 */
export function useChangeMemberRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contestId, userId, data }: { contestId: number; userId: number; data: ChangeMemberRoleRequest }) => 
      contestApi.changeMemberRole(contestId, userId, data),
    onSuccess: (_, { contestId }) => {
      queryClient.invalidateQueries({ queryKey: contestKeys.members(contestId) });
    },
  });
}

/**
 * Hook to fetch contest results/bracket
 */
export function useContestResult(contestId: number) {
  return useQuery({
    queryKey: contestKeys.result(contestId),
    queryFn: async () => {
      return contestApi.getContestResult(contestId);
    },
    enabled: !!contestId,
  });
}

/**
 * Hook to fetch contest comments
 */
export function useContestComments(contestId: number, params?: { page?: number; page_size?: number; sort_by?: string; order?: string }) {
  return useQuery({
    queryKey: contestKeys.comments(contestId, params),
    queryFn: async () => {
      return contestApi.getContestComments(contestId, params);
    },
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

