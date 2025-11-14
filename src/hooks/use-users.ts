import { usersService } from '@/services';
import type {
  CreateUserRequest,
  MessageResponse,
  ProfileResponse,
  UpdateUserEmailRequest,
  UpdateUserPasswordRequest,
  UpdateUserProfileRequest,
  UpdateUserRoleRequest,
  UpdateUserUsernameRequest,
  UserResponse,
  UsersResponse,
} from '@/types/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Query Keys
export const usersKeys = {
  all: ['users'] as const,
  lists: () => [...usersKeys.all, 'list'] as const,
  list: (filters?: string) => [...usersKeys.lists(), filters] as const,
  details: () => [...usersKeys.all, 'detail'] as const,
  detail: (id: string) => [...usersKeys.details(), id] as const,
  byEmail: (email: string) => [...usersKeys.all, 'email', email] as const,
  byUsername: (username: string) =>
    [...usersKeys.all, 'username', username] as const,
  byRole: (role: string) => [...usersKeys.all, 'role', role] as const,
  online: () => [...usersKeys.all, 'online'] as const,
};

// Queries

/**
 * Hook para listar todos os usuários
 * GET /v1/users
 * @requires MANAGER role
 */
export function useUsers(enabled = true) {
  return useQuery<UsersResponse, Error>({
    queryKey: usersKeys.lists(),
    queryFn: () => usersService.listUsers(),
    enabled,
  });
}

/**
 * Hook para obter usuário por ID
 * GET /v1/users/:userId
 */
export function useUser(userId: string, enabled = true) {
  return useQuery<UserResponse, Error>({
    queryKey: usersKeys.detail(userId),
    queryFn: () => usersService.getUser(userId),
    enabled: enabled && !!userId,
  });
}

/**
 * Hook para obter usuário por email
 * GET /v1/users/email/:email
 */
export function useUserByEmail(email: string, enabled = true) {
  return useQuery<UserResponse, Error>({
    queryKey: usersKeys.byEmail(email),
    queryFn: () => usersService.getUserByEmail(email),
    enabled: enabled && !!email,
  });
}

/**
 * Hook para obter usuário por username
 * GET /v1/users/username/:username
 */
export function useUserByUsername(username: string, enabled = true) {
  return useQuery<UserResponse, Error>({
    queryKey: usersKeys.byUsername(username),
    queryFn: () => usersService.getUserByUsername(username),
    enabled: enabled && !!username,
  });
}

/**
 * Hook para listar usuários por role
 * GET /v1/users/role/:role
 * @requires ADMIN role
 */
export function useUsersByRole(
  role: 'USER' | 'MANAGER' | 'ADMIN',
  enabled = true
) {
  return useQuery<UsersResponse, Error>({
    queryKey: usersKeys.byRole(role),
    queryFn: () => usersService.getUsersByRole(role),
    enabled: enabled && !!role,
  });
}

/**
 * Hook para listar usuários online
 * GET /v1/users/online
 */
export function useOnlineUsers(enabled = true) {
  return useQuery<UsersResponse, Error>({
    queryKey: usersKeys.online(),
    queryFn: () => usersService.getOnlineUsers(),
    enabled,
  });
}

// Mutations

/**
 * Hook para criar novo usuário
 * POST /v1/users
 * @requires MANAGER role
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation<UserResponse, Error, CreateUserRequest>({
    mutationFn: data => usersService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}

/**
 * Hook para atualizar email de um usuário
 * PATCH /v1/users/:userId/email
 * @requires ADMIN role
 */
export function useUpdateUserEmail() {
  const queryClient = useQueryClient();

  return useMutation<
    UserResponse,
    Error,
    { userId: string; data: UpdateUserEmailRequest }
  >({
    mutationFn: ({ userId, data }) =>
      usersService.updateUserEmail(userId, data),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.detail(userId) });
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}

/**
 * Hook para atualizar username de um usuário
 * PATCH /v1/users/:userId/username
 * @requires ADMIN role
 */
export function useUpdateUserUsername() {
  const queryClient = useQueryClient();

  return useMutation<
    UserResponse,
    Error,
    { userId: string; data: UpdateUserUsernameRequest }
  >({
    mutationFn: ({ userId, data }) =>
      usersService.updateUserUsername(userId, data),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.detail(userId) });
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}

/**
 * Hook para atualizar senha de um usuário
 * PATCH /v1/users/:userId/password
 * @requires ADMIN role
 */
export function useUpdateUserPassword() {
  return useMutation<
    MessageResponse,
    Error,
    { userId: string; data: UpdateUserPasswordRequest }
  >({
    mutationFn: ({ userId, data }) =>
      usersService.updateUserPassword(userId, data),
  });
}

/**
 * Hook para atualizar role de um usuário
 * PATCH /v1/users/:userId/role
 * @requires ADMIN role
 */
export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation<
    UserResponse,
    Error,
    { userId: string; data: UpdateUserRoleRequest }
  >({
    mutationFn: ({ userId, data }) => usersService.updateUserRole(userId, data),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.detail(userId) });
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
      queryClient.invalidateQueries({ queryKey: usersKeys.byRole('USER') });
      queryClient.invalidateQueries({ queryKey: usersKeys.byRole('MANAGER') });
      queryClient.invalidateQueries({ queryKey: usersKeys.byRole('ADMIN') });
    },
  });
}

/**
 * Hook para atualizar perfil de um usuário
 * PATCH /v1/users/:userId
 * @requires ADMIN role
 */
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation<
    ProfileResponse,
    Error,
    { userId: string; data: UpdateUserProfileRequest }
  >({
    mutationFn: ({ userId, data }) =>
      usersService.updateUserProfile(userId, data),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.detail(userId) });
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}

/**
 * Hook para deletar um usuário
 * DELETE /v1/users/:userId
 * @requires ADMIN role
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: userId => usersService.deleteUser(userId),
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
      queryClient.removeQueries({ queryKey: usersKeys.detail(userId) });
    },
  });
}
