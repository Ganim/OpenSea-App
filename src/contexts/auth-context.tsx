'use client';

import { authConfig } from '@/config/api';
import { useLogin, useLogout, useMe, useRegister } from '@/hooks';
import type { LoginCredentials, RegisterData, User } from '@/types';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext } from 'react';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Hooks de autenticação
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  // Hook para buscar dados do usuário
  // Sempre habilitado se houver token
  const hasToken =
    typeof window !== 'undefined' &&
    !!localStorage.getItem(authConfig.tokenKey);
  const {
    data: userData,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useMe(hasToken);

  const user = userData?.user || null;
  const isAuthenticated = !!user && hasToken;

  // Login
  const login = async (credentials: LoginCredentials) => {
    try {
      console.log('🔐 Iniciando login...');
      const response = await loginMutation.mutateAsync(credentials);
      console.log('✅ Login bem-sucedido:', response);

      // Salva os tokens usando as chaves corretas
      localStorage.setItem(authConfig.tokenKey, response.token);
      localStorage.setItem(authConfig.refreshTokenKey, response.refreshToken);
      console.log('💾 Tokens salvos no localStorage');

      // Aguarda os dados do usuário serem carregados
      console.log('🔄 Buscando dados do usuário...');
      await refetchUser();
      console.log('✅ Dados do usuário carregados');

      // Redireciona para o dashboard
      console.log('🚀 Redirecionando para /');
      router.push('/');
    } catch (error) {
      console.error('❌ Erro no login:', error);
      throw error;
    }
  };

  // Register
  const register = async (data: RegisterData) => {
    try {
      // Cria o usuário via endpoint de autenticação
      await registerMutation.mutateAsync(data);

      // Após registro, faz login automático
      await login({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      // Limpa os tokens independentemente do resultado
      localStorage.removeItem(authConfig.tokenKey);
      localStorage.removeItem(authConfig.refreshTokenKey);

      // Redireciona para login
      router.push('/login');
    }
  };

  const value: AuthContextType = {
    user,
    isLoading: isLoadingUser,
    isAuthenticated,
    login,
    register,
    logout,
    refetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
