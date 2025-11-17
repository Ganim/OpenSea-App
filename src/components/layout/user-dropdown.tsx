/**
 * User Dropdown Component
 * Dropdown com informações e ações do usuário
 */

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/auth-context';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, Moon, Settings, Sun, Users } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

export function UserDropdown() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-xl h-10 px-2 gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              {user?.profile?.name?.charAt(0) ||
                user?.username?.charAt(0) ||
                'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={22}
        className="w-64 backdrop-blur-xl bg-white/90 dark:bg-white/5 border-gray-200 dark:border-white/10 p-2"
      >
        <DropdownMenuLabel className="px-3 py-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {user?.profile?.name || user?.username || 'Usuário'}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {user?.email || 'email@example.com'}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          className="px-3 py-3 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          onClick={() => router.push('/profile')}
        >
          <Users className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Perfil</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="px-3 py-3 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          onClick={() => router.push('/settings')}
        >
          <Settings className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Configurações</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onSelect={e => {
            e.preventDefault();
            toggleTheme();
          }}
          className="px-3 py-3 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          <motion.div
            className="flex items-center w-full"
            initial={false}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-5 h-5 mr-3">
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: 180, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: 'backOut',
                    }}
                    className="absolute inset-0"
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0, rotate: 180, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: -180, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: 'backOut',
                    }}
                    className="absolute inset-0"
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="text-sm font-medium">
              {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
            </span>
          </motion.div>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          className="px-3 py-3 cursor-pointer rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
