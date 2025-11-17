/**
 * Profile Page
 * Página de perfil do usuário
 */

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';
import { motion } from 'framer-motion';
import { Camera, Mail, User } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Meu Perfil
        </h1>
        <p className="text-lg text-gray-600 dark:text-white/60">
          Gerencie suas informações pessoais
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 backdrop-blur-xl bg-white/90 dark:bg-white/5 border-gray-200 dark:border-white/10">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="text-2xl">
                    {user?.profile?.name?.charAt(0) ||
                      user?.username?.charAt(0) ||
                      'U'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full w-10 h-10 bg-blue-500 hover:bg-blue-600"
                >
                  <Camera className="w-5 h-5 text-white" />
                </Button>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white">
                  {user?.profile?.name || user?.username || 'Usuário'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-white/60">
                  {user?.email || 'email@example.com'}
                </p>
              </div>

              <Button variant="outline" className="w-full">
                Alterar Foto
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="p-6 backdrop-blur-xl bg-white/90 dark:bg-white/5 border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Informações Pessoais
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      defaultValue={user?.profile?.name || ''}
                      className="pl-10"
                      placeholder="Seu nome completo"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.email || ''}
                      className="pl-10"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <textarea
                  id="bio"
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Conte um pouco sobre você..."
                  defaultValue=""
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-linear-to-r from-blue-500 to-purple-600 text-white">
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
