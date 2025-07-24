import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import DockNav from '@/components/DockNav';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Header */}
      <header className="bg-charcoal shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center w-full">
            <button 
              onClick={handleLogoClick}
              className="h-24 w-24 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="Go to homepage"
            >
              <img src="/assets/logo.svg" alt="tomeTalk logo" className="h-full w-full object-contain" />
            </button>
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