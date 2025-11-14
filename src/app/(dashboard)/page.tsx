'use client';

import { ProfileForm } from '@/components/profile-form';
import { useAuth } from '@/contexts/auth-context';
import { useMySessions, useUpdateProfile } from '@/hooks';
import type { UpdateProfileRequest } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading, isAuthenticated, logout } = useAuth();
  const { data: sessionsData } = useMySessions(isAuthenticated);

  const updateProfile = useUpdateProfile();

  const [editMode, setEditMode] = useState(false);

  // Use useMemo to derive initial profile data
  const initialProfileData = useMemo(
    () => ({
      name: user?.profile?.name || '',
      surname: user?.profile?.surname || '',
      location: user?.profile?.location || '',
      bio: user?.profile?.bio || '',
    }),
    [
      user?.profile?.name,
      user?.profile?.surname,
      user?.profile?.location,
      user?.profile?.bio,
    ]
  );

  const [profileData, setProfileData] = useState(initialProfileData);

  // Update profile data only when initial data changes
  useEffect(() => {
    setProfileData(initialProfileData);
  }, [initialProfileData]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isAuthLoading, router]);

  const handleSaveProfile = async (data: UpdateProfileRequest) => {
    try {
      await updateProfile.mutateAsync(data);
      setEditMode(false);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  const handleCancelEdit = () => {
    setProfileData(initialProfileData);
    setEditMode(false);
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                🌊 OpenSea Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user.profile?.name || user.username}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vindo, {user.profile?.name || user.username}! 👋
          </h2>
          <p className="text-gray-600">
            Este é o seu painel de controle. Gerencie seu perfil e veja suas
            informações.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Informações do Perfil
              </h3>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Editar
                </button>
              )}
            </div>

            <div className="space-y-4">
              {editMode ? (
                <ProfileForm
                  initialData={profileData}
                  onSubmit={handleSaveProfile}
                  onCancel={handleCancelEdit}
                  isSubmitting={updateProfile.isPending}
                />
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome
                      </label>
                      <p className="text-gray-900">
                        {user.profile?.name || '-'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sobrenome
                      </label>
                      <p className="text-gray-900">
                        {user.profile?.surname || '-'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <p className="text-gray-900">@{user.username}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Localização
                    </label>
                    <p className="text-gray-900">
                      {user.profile?.location || '-'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <p className="text-gray-900">{user.profile?.bio || '-'}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-6">
            {/* Account Status */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Status da Conta
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Role</span>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded">
                    {user.role}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    Ativo
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Email Verificado
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    ✓ Sim
                  </span>
                </div>
              </div>
            </div>

            {/* Sessions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sessões Ativas
              </h3>
              <p className="text-3xl font-bold text-indigo-600">
                {sessionsData?.sessions.length || 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                dispositivos conectados
              </p>
            </div>

            {/* API Status */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Status da API
              </h3>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Conectado</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                http://localhost:3333
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
