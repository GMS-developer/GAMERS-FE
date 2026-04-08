import { apiClient } from '@/lib/api-client';
import { 
  Contest, 
  ContestListResponse, 
  GetContestsParams,
  ContestMemberListResponse,
  ContestResult,
  ContestCommentListResponse
} from '@/types/contest';

export const contestApi = {
  /**
   * Get all contests with pagination, sorting, and title search support
   */
  getContests: (params: GetContestsParams) => {
    // Convert params to string record for apiClient
    const queryParams: Record<string, string> = {};
    if (params.page) queryParams.page = params.page.toString();
    if (params.page_size) queryParams.page_size = params.page_size.toString();
    if (params.sort_by) queryParams.sort_by = params.sort_by;
    if (params.order) queryParams.order = params.order;
    if (params.title) queryParams.title = params.title;

    return apiClient.get<ContestListResponse>('/api/contests', { params: queryParams });
  },

  /**
   * Get contest details by contest ID
   */
  getContest: (id: number) => 
    apiClient.get<Contest>(`/api/contests/${id}`),

  /**
   * Request to participate in a contest
   */
  applyToContest: (contestId: number, data?: { description?: string; valorant_roles?: string[] }) =>
    apiClient.post(`/api/contests/${contestId}/applications`, data),

  /**
   * Cancel my pending application
   */
  cancelApplication: (contestId: number) =>
    apiClient.delete(`/api/contests/${contestId}/applications/cancel`),

  /**
   * Get current user's application status for a contest
   */
  getMyApplicationStatus: (contestId: number) =>
    apiClient.get<any>(`/api/contests/${contestId}/applications/me`),

  /**
   * Withdraw from a contest
   */
  withdrawFromContest: (contestId: number) =>
    apiClient.delete(`/api/contests/${contestId}/applications/withdraw`),

  /**
   * Get all members of a contest
   */
  getContestMembers: (contestId: number, params?: { page?: number; page_size?: number; sort_by?: string; order?: string }) => {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = params.page.toString();
    if (params?.page_size) queryParams.page_size = params.page_size.toString();
    if (params?.sort_by) queryParams.sort_by = params.sort_by;
    if (params?.order) queryParams.order = params.order;
    return apiClient.get<ContestMemberListResponse>(`/api/contests/${contestId}/members`, { params: queryParams });
  },

  /**
   * Get contest results/bracket
   */
  getContestResult: (contestId: number) =>
    apiClient.get<ContestResult>(`/api/contests/${contestId}/result`),

  /**
   * Get all comments for a contest
   */
  getContestComments: (contestId: number, params?: { page?: number; page_size?: number; sort_by?: string; order?: string }) => {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = params.page.toString();
    if (params?.page_size) queryParams.page_size = params.page_size.toString();
    if (params?.sort_by) queryParams.sort_by = params.sort_by;
    if (params?.order) queryParams.order = params.order;
    return apiClient.get<ContestCommentListResponse>(`/api/contests/${contestId}/comments`, { params: queryParams });
  },

  /**
   * Create a new comment for a contest
   */
  createComment: (contestId: number, data: { content: string }) =>
    apiClient.post(`/api/contests/${contestId}/comments`, data),
};
