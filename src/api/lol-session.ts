import { apiClient } from '@/lib/api-client';
import { 
  CreateSessionResponse, 
  GetSessionResponse 
} from '@/types/lol';

export const lolSessionApi = {
  /**
   * Create a new custom match session
   */
  createSession: () => {
    return apiClient.post<CreateSessionResponse>('/api/lol/sessions');
  },

  /**
   * Get session details by session ID
   */
  getSession: (sessionId: string) => {
    return apiClient.get<GetSessionResponse>(`/api/lol/sessions/${sessionId}`);
  },

  /**
   * Cancel a session (Host only)
   */
  deleteSession: (sessionId: string) => {
    return apiClient.delete(`/api/lol/sessions/${sessionId}`);
  },

  /**
   * Get WebSocket URL for the session
   * Note: This is a helper for the frontend to construct the URL
   */
  getWsUrl: (sessionId: string, token: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_WS_BASE_URL || 'wss://api.gamers.io.kr';
    return `${baseUrl}/api/lol/sessions/${sessionId}/ws?token=${token}`;
  },
};
