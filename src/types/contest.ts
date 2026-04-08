export enum ContestStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
}

export enum ContestType {
  TOURNAMENT = 'TOURNAMENT',
  LEAGUE = 'LEAGUE',
  CASUAL = 'CASUAL',
}

export enum GameType {
  VALORANT = 'VALORANT',
  LOL = 'LOL',
}

export enum ValorantRole {
  DUELIST = 'DUELIST',
  INITIATOR = 'INITIATOR',
  CONTROLLER = 'CONTROLLER',
  SENTINEL = 'SENTINEL',
}

export interface Contest {
  contest_id: number;
  title: string;
  description: string;
  thumbnail: string;
  contest_status: ContestStatus;
  contest_type: ContestType;
  game_type: GameType;
  started_at: string;
  ended_at: string;
  created_at: string;
  modified_at: string;
  max_team_count: number;
  total_team_member: number;
  total_point: number;
  auto_start: boolean;
  discord_guild_id: string;
  discord_text_channel_id: string;
}

export interface PaginationMeta {
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
}

export interface ContestListResponse extends PaginationMeta {
  data: Contest[];
}

export interface GetContestsParams {
  page?: number;
  page_size?: number;
  sort_by?: string;
  order?: 'asc' | 'desc';
  title?: string;
}

export interface Author {
  user_id: number;
  username: string;
  tag: string;
  avatar?: string;
}

export interface ContestComment {
  comment_id: number;
  contest_id: number;
  content: string;
  author: Author;
  created_at: string;
  modified_at: string;
}

export interface ContestCommentListResponse extends PaginationMeta {
  data: ContestComment[];
}

export interface ContestMember {
  user_id: number;
  username: string;
  tag: string;
  avatar?: string;
  point: number;
  joined_at: string;
}

export interface ContestMemberListResponse extends PaginationMeta {
  data: ContestMember[];
}

export interface ContestGame {
  game_id: number;
  contest_id: number;
  game_status: string;
  game_team_type: string;
  started_at: string;
  ended_at: string;
  created_at: string;
  modified_at: string;
}

export interface TeamSummary {
  team_id: number;
  team_name: string;
}

export interface RoundResult {
  round: number;
  round_name: string;
  games: any[];
}

export interface ContestResult {
  contest_id: number;
  title: string;
  contest_status: string;
  total_rounds: number;
  rounds: RoundResult[];
  champion?: TeamSummary;
}
