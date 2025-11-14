import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/lib/api-client';
import type {
  MessageResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SessionDateQuery,
  SessionsResponse,
} from '@/types/auth';
import { authService } from './auth.service';

export const sessionsService = {
  // GET /v1/sessions/user/:userId
  async listUserSessions(userId: string): Promise<SessionsResponse> {
    return apiClient.get<SessionsResponse>(
      API_ENDPOINTS.SESSIONS.LIST_USER(userId)
    );
  },

  // GET /v1/sessions/user/:userId/by-date
  async listUserSessionsByDate(
    userId: string,
    query?: SessionDateQuery
  ): Promise<SessionsResponse> {
    return apiClient.get<SessionsResponse>(
      API_ENDPOINTS.SESSIONS.LIST_USER_BY_DATE(userId),
      { params: query as Record<string, string> }
    );
  },

  // GET /v1/sessions
  async listMySessions(): Promise<SessionsResponse> {
    return apiClient.get<SessionsResponse>(API_ENDPOINTS.SESSIONS.LIST_MY);
  },

  // GET /v1/sessions/active
  async listActiveSessions(): Promise<SessionsResponse> {
    return apiClient.get<SessionsResponse>(API_ENDPOINTS.SESSIONS.LIST_ACTIVE);
  },

  // POST /v1/sessions/refresh
  async refreshToken(
    data?: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    const refreshToken =
      data?.refreshToken || authService.getRefreshToken() || '';

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<RefreshTokenResponse>(
      API_ENDPOINTS.SESSIONS.REFRESH,
      { refreshToken }
    );

    if (response.token) {
      authService.setToken(response.token);
    }
    if (response.refreshToken) {
      authService.setRefreshToken(response.refreshToken);
    }

    return response;
  },

  // POST /v1/sessions/logout
  async logout(): Promise<MessageResponse> {
    try {
      const response = await apiClient.post<MessageResponse>(
        API_ENDPOINTS.SESSIONS.LOGOUT
      );
      return response;
    } finally {
      authService.clearTokens();
    }
  },

  // POST /v1/sessions/:sessionId/revoke
  async revokeSession(sessionId: string): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>(
      API_ENDPOINTS.SESSIONS.REVOKE(sessionId)
    );
  },

  // POST /v1/sessions/:sessionId/expire
  async expireSession(sessionId: string): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>(
      API_ENDPOINTS.SESSIONS.EXPIRE(sessionId)
    );
  },
};
