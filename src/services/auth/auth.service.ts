import { API_ENDPOINTS, authConfig } from '@/config/api';
import { apiClient } from '@/lib/api-client';
import type {
  AuthResponse,
  LoginCredentials,
  MessageResponse,
  RegisterData,
  RegisterResponse,
  ResetPasswordRequest,
  SendPasswordResetRequest,
} from '@/types/auth';

export const authService = {
  // POST /v1/auth/login/password
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    if (response.token) {
      this.setToken(response.token);
      if (response.refreshToken) {
        this.setRefreshToken(response.refreshToken);
      }
    }

    return response;
  },

  // POST /v1/auth/register/password
  async register(data: RegisterData): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );

    return response;
  },

  // POST /v1/auth/send/password
  async sendPasswordReset(
    data: SendPasswordResetRequest
  ): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>(
      API_ENDPOINTS.AUTH.SEND_PASSWORD_RESET,
      data
    );
  },

  // POST /v1/auth/reset/password
  async resetPassword(data: ResetPasswordRequest): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      data
    );
  },

  // Token Management
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(authConfig.tokenKey, token);
    }
  },

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(authConfig.tokenKey);
  },

  setRefreshToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(authConfig.refreshTokenKey, token);
    }
  },

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(authConfig.refreshTokenKey);
  },

  clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(authConfig.tokenKey);
      localStorage.removeItem(authConfig.refreshTokenKey);
    }
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
