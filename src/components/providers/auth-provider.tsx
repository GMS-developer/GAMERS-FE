'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useLogout } from '@/hooks/use-auth';
import { User } from '@/types/auth';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading: isUserLoading, isError } = useUser();
  const logoutMutation = useLogout();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for tokens and user data to determine authentication status
    const hasToken = !!Cookies.get('access_token') || !!Cookies.get('refresh_token');
    setIsAuthenticated(hasToken && !!user);
  }, [user]);

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isAuthenticated,
        isLoading: isUserLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
