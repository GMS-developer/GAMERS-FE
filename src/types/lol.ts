import { LolSessionStatus, LolMatchWinner } from './enums';

export interface LolSummonerLookupResponse {
  username: string;
  tag: string;
  rank: string;
  tier: string;
  division: string;
  lp: number;
}

export interface LolTemporalPlayerV2 {
  username: string;
  tag: string;
  rank: string;
  positions: string[];
}

export interface LolTemporalContestRequestV2 {
  members: LolTemporalPlayerV2[];
}

export interface LolTemporalAssignedPlayer {
  username: string;
  tag: string;
  rank: string;
  position: string;
  position_preference: number;
}

export interface LolTemporalContestResponseWithMatchID {
  match_id: number;
  team_a: LolTemporalAssignedPlayer[];
  team_b: LolTemporalAssignedPlayer[];
}

export interface LolMatchResultRequest {
  winner: LolMatchWinner;
}

export interface CreateSessionResponse {
  session_id: string;
}

export interface GetSessionResponse {
  session_id: string;
  host_user_id: number;
  status: LolSessionStatus;
  players: any; // TODO: Define specific player type if needed
  balance_result: any; // TODO: Define specific result type if needed
  created_at: string;
}

export type SummonerLookupParams = {
  nickname?: string;
  name?: string;
  tag?: string;
  region?: string;
};
