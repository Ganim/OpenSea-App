/**
 * Menu Types
 * Tipos para o sistema de navegação
 */

export type MenuItemVariant = 'primary' | 'alert' | 'new' | 'inactive';

export type UserRole = 'USER' | 'MANAGER' | 'ADMIN';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  href?: string;
  submenu?: MenuItem[];
  variant?: MenuItemVariant;
  requiredRole?: UserRole; // Role mínima necessária para ver este item
}
