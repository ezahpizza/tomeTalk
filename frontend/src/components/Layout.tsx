import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { BookOpen } from 'lucide-react';
import DockNav from '@/components/DockNav';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Header */}
      <header className="bg-charcoal border-b-2 border-charmPink shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-charmPink" />
              <h1 className="text-2xl font-heading font-bold text-white">
                tome<span className="text-charmPink">Talk</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="pb-28 relative" style={{ isolation: 'isolate' }}>
        {children}
      </main>

      {/* Navigation Dock */}
      <DockNav />
    </div>
  );
};