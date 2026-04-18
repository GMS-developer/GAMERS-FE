import { apiClient } from '@/lib/api-client';
import { 
  LolSummonerLookupResponse, 
  LolTemporalContestRequestV2, 
  LolTemporalContestResponseWithMatchID,
  LolMatchResultRequest,
  SummonerLookupParams
} from '@/types/lol';

export const lolApi = {
  /**
   * Lookup summoner info by Riot ID (name#tag)
   */
  summonerLookup: (params: SummonerLookupParams) => {
    return apiClient.get<LolSummonerLookupResponse>('/api/lol/summoner', { params });
  },

  /**
   * Balance teams for a temporary LoL custom game and save the result
   */
  balanceTeams: (data: LolTemporalContestRequestV2) => {
    return apiClient.post<LolTemporalContestResponseWithMatchID>('/api/lol/temporal', data);
  },

  /**
   * Record the winner of a custom LoL match
   */
  recordMatchResult: (matchId: number, data: LolMatchResultRequest) => {
    return apiClient.patch(`/api/lol/temporal/${matchId}/result`, data);
  },
};
