/**
 * Menu Items Configuration
 * Estrutura de navegação do dashboard
 */

import type { MenuItem } from '@/types/menu';
import {
  BarChart3,
  Box,
  Building2,
  CircleDollarSign,
  FileText,
  Home,
  Package,
  PackageSearch,
  ShoppingCart,
  Store,
  Tag,
  Truck,
  Users,
  Warehouse,
} from 'lucide-react';

export const menuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'Início',
    icon: <Home className="w-6 h-6" />,
    href: '/',
  },
  {
    id: 'stock',
    label: 'Estoque',
    icon: <Package className="w-6 h-6" />,
    submenu: [
      {
        id: 'assets',
        label: 'Ativos',
        icon: <Box className="w-6 h-6" />,
        submenu: [
          {
            id: 'templates',
            label: 'Templates',
            icon: <FileText className="w-6 h-6" />,
            href: '/stock/assets/templates',
            // Usuários comuns são redirecionados para página de requisição
          },
          {
            id: 'products',
            label: 'Produtos',
            icon: <Package className="w-6 h-6" />,
            href: '/stock/assets/products',
            requiredRole: 'MANAGER',
          },
          {
            id: 'variants',
            label: 'Variantes',
            icon: <PackageSearch className="w-6 h-6" />,
            href: '/stock/assets/variants',
            requiredRole: 'MANAGER',
          },
          {
            id: 'items',
            label: 'Itens',
            icon: <Box className="w-6 h-6" />,
            href: '/stock/assets/items',
            requiredRole: 'MANAGER',
          },
        ],
      },
      {
        id: 'supply',
        label: 'Fornecimento',
        icon: <Truck className="w-6 h-6" />,
        submenu: [
          {
            id: 'suppliers',
            label: 'Fornecedores',
            icon: <Building2 className="w-6 h-6" />,
            href: '/stock/supply/suppliers',
            requiredRole: 'MANAGER',
          },
          {
            id: 'brands',
            label: 'Marcas',
            icon: <Tag className="w-6 h-6" />,
            href: '/stock/supply/brands',
            requiredRole: 'MANAGER',
          },
          {
            id: 'requests',
            label: 'Solicitações',
            icon: <FileText className="w-6 h-6" />,
            href: '/stock/supply/requests',
          },
        ],
      },
      {
        id: 'storage',
        label: 'Armazenamento',
        icon: <Warehouse className="w-6 h-6" />,
        href: '/stock/storage',
      },
    ],
  },
  {
    id: 'finance',
    label: 'Financeiro',
    icon: <CircleDollarSign className="w-6 h-6" />,
    badge: 'Em breve',
    variant: 'inactive',
  },
  {
    id: 'sales',
    label: 'Vendas',
    icon: <ShoppingCart className="w-6 h-6" />,
    badge: 'Em breve',
    variant: 'inactive',
  },
  {
    id: 'cashier',
    label: 'Caixa',
    icon: <Store className="w-6 h-6" />,
    badge: 'Em breve',
    variant: 'inactive',
  },
  {
    id: 'production',
    label: 'Produção',
    icon: <BarChart3 className="w-6 h-6" />,
    badge: 'Em breve',
    variant: 'inactive',
  },
  {
    id: 'users',
    label: 'Usuários',
    icon: <Users className="w-6 h-6" />,
    badge: 'Em breve',
    variant: 'inactive',
  },
];
