import { apiClient } from '@/lib/api-client';
import { 
  LoginRequest, 
  LogoutRequest, 
  RefreshRequest, 
  CreateUserRequest,
  AuthTokens, 
  User 
} from '@/types/auth';

export const authApi = {
  login: (data: LoginRequest) => 
    apiClient.post<{ user: User; tokens: AuthTokens }>('/api/auth/login', data),
    
  signup: (data: CreateUserRequest) =>
    apiClient.post<User>('/api/users', data),
    
  logout: (data: LogoutRequest) => 
    apiClient.post('/api/auth/logout', data),
    
  refresh: (data: RefreshRequest) => 
    apiClient.post<AuthTokens>('/api/auth/refresh', data),
    
  getMe: () => 
    apiClient.get<User>('/api/users/my'),
    
  getDiscordLoginUrl: () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.gamers.io.kr';
    // Ensure the API URL starts with a protocol to prevent browser-side origin prepending
    const normalizedApiUrl = apiUrl.startsWith('http') ? apiUrl : `https://${apiUrl}`;
    return `${normalizedApiUrl}/api/oauth2/discord/login`;
  },

  discordCallback: (code: string, state?: string) =>
    apiClient.get('/api/auth/callback/discord', {
      params: { code, state },
    }),
};
