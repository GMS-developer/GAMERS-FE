import { useQuery, useMutation } from '@tanstack/react-query';
import { lolApi } from '@/api/lol';
import { 
  LolTemporalContestRequestV2, 
  LolMatchResultRequest,
  SummonerLookupParams
} from '@/types/lol';

export const lolKeys = {
  all: ['lol'] as const,
  summoner: (params: SummonerLookupParams) => [...lolKeys.all, 'summoner', params] as const,
  temporal: ['lol', 'temporal'] as const,
};

/**
 * Hook to lookup summoner information by Riot ID
 */
export function useSummonerLookup(params: SummonerLookupParams) {
  return useQuery({
    queryKey: lolKeys.summoner(params),
    queryFn: async () => {
      return lolApi.summonerLookup(params);
    },
    enabled: !!(params.nickname || (params.name && params.tag)),
  });
}

/**
 * Hook to balance teams for a Temporal LoL game
 */
export function useBalanceTeams() {
  return useMutation({
    mutationFn: (data: LolTemporalContestRequestV2) => lolApi.balanceTeams(data),
  });
}

/**
 * Hook to record the result of a LoL match
 */
export function useRecordMatchResult() {
  return useMutation({
    mutationFn: ({ matchId, data }: { matchId: number; data: LolMatchResultRequest }) => 
      lolApi.recordMatchResult(matchId, data),
  });
}
