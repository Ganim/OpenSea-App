import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/lib/api-client';
import type {
  MessageResponse,
  ProfileResponse,
  UpdateEmailRequest,
  UpdatePasswordRequest,
  UpdateProfileRequest,
  UpdateUsernameRequest,
  UserResponse,
} from '@/types/auth';

export const meService = {
  // GET /v1/me
  async getMe(): Promise<UserResponse> {
    return apiClient.get<UserResponse>(API_ENDPOINTS.ME.GET);
  },

  // PATCH /v1/me
  async updateProfile(data: UpdateProfileRequest): Promise<ProfileResponse> {
    return apiClient.patch<ProfileResponse>(API_ENDPOINTS.ME.UPDATE, data);
  },

  // PATCH /v1/me/email
  async updateEmail(data: UpdateEmailRequest): Promise<UserResponse> {
    return apiClient.patch<UserResponse>(API_ENDPOINTS.ME.UPDATE_EMAIL, data);
  },

  // PATCH /v1/me/username
  async updateUsername(data: UpdateUsernameRequest): Promise<UserResponse> {
    return apiClient.patch<UserResponse>(
      API_ENDPOINTS.ME.UPDATE_USERNAME,
      data
    );
  },

  // PATCH /v1/me/password
  async updatePassword(data: UpdatePasswordRequest): Promise<MessageResponse> {
    return apiClient.patch<MessageResponse>(
      API_ENDPOINTS.ME.UPDATE_PASSWORD,
      data
    );
  },

  // DELETE /v1/me
  async deleteAccount(): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.ME.DELETE);
  },
};
