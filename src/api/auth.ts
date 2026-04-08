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
    return `${apiUrl}/api/oauth2/discord/login`;
  },
};
