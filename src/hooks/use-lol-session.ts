import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lolSessionApi } from '@/api/lol-session';
import { LolSessionStatus } from '@/types/enums';

export const lolSessionKeys = {
  all: ['lol-sessions'] as const,
  details: () => [...lolSessionKeys.all, 'detail'] as const,
  detail: (id: string) => [...lolSessionKeys.details(), id] as const,
};

/**
 * Hook to fetch LoL session details
 */
export function useLolSession(sessionId: string) {
  return useQuery({
    queryKey: lolSessionKeys.detail(sessionId),
    queryFn: async () => {
      return lolSessionApi.getSession(sessionId);
    },
    enabled: !!sessionId,
    refetchInterval: (query) => {
      // Periodically refetch if waiting or balancing
      const status = query.state.data?.status;
      return (status === LolSessionStatus.WAITING || status === LolSessionStatus.BALANCING) ? 3000 : false;
    },
  });
}

/**
 * Hook to create a new LoL session
 */
export function useCreateLolSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => lolSessionApi.createSession(),
    onSuccess: (response) => {
      const sessionId = response.session_id;
      if (sessionId) {
        queryClient.invalidateQueries({ queryKey: lolSessionKeys.all });
      }
    },
  });
}

/**
 * Hook to delete/cancel a LoL session
 */
export function useDeleteLolSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => lolSessionApi.deleteSession(sessionId),
    onSuccess: (_, sessionId) => {
      queryClient.invalidateQueries({ queryKey: lolSessionKeys.all });
      queryClient.removeQueries({ queryKey: lolSessionKeys.detail(sessionId) });
    },
  });
}
