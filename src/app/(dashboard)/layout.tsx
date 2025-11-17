'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { Navbar } from '@/components/layout/navbar';
import { NavigationMenu } from '@/components/layout/navigation-menu';
import { menuItems } from '@/config/menu-items';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <Navbar onMenuOpen={() => setIsMenuOpen(true)} />

        <NavigationMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          menuItems={menuItems}
        />

        {/* Main Content */}
        <main className="pt-28 px-6 pb-12">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
