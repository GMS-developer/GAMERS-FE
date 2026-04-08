import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { authApi } from '@/api/auth';
import { LoginRequest, AuthTokens, CreateUserRequest } from '@/types/auth';

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      // Set tokens in cookies
      Cookies.set('access_token', data.tokens.access_token, { expires: 1 }); // 1 day
      Cookies.set('refresh_token', data.tokens.refresh_token, { expires: 7 }); // 7 days
      
      // Update user in query cache
      queryClient.setQueryData(['user'], data.user);
      
      // Redirect to home or intended page
      router.push('/');
    },
  });
}

export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateUserRequest) => authApi.signup(data),
    onSuccess: () => {
      // After successful signup, redirect to login
      router.push('/login');
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => {
      const access_token = Cookies.get('access_token') || '';
      const refresh_token = Cookies.get('refresh_token') || '';
      return authApi.logout({ access_token, refresh_token });
    },
    onSettled: () => {
      // Always clear tokens regardless of API success
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      
      // Clear user from cache
      queryClient.removeQueries({ queryKey: ['user'] });
      
      // Redirect to login
      router.push('/login');
    },
  });
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => authApi.getMe(),
    enabled: !!Cookies.get('access_token') || !!Cookies.get('refresh_token'),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useDiscordLogin() {
  const login = () => {
    window.location.href = authApi.getDiscordLoginUrl();
  };
  
  return { login };
}
