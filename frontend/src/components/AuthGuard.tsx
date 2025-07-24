import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { PacmanLoader } from "react-spinners";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGuard = ({ 
  children, 
  fallback = (
    <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <PacmanLoader color='#D1D4FD'/>
    </div>
  )
}: AuthGuardProps) => {
  const { isAuthenticated, user, loading, refreshAuth } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationComplete, setVerificationComplete] = useState(false);

  useEffect(() => {
    const verifyAuthOnRouteAccess = async () => {
      setIsVerifying(true);
      
      try {
        const isValid = await refreshAuth();
        
        if (!isValid) {
          setVerificationComplete(true);
          setIsVerifying(false);
          return;
        }
        
        setVerificationComplete(true);
      } catch (error) {
        console.error('Auth verification error:', error);
        setVerificationComplete(true);
      } finally {
        setIsVerifying(false);
      }
    };

    if (!verificationComplete) {
      verifyAuthOnRouteAccess();
    }
  }, [refreshAuth, verificationComplete]);

  if (isVerifying || loading || !verificationComplete) {
    return <>{fallback}</>;
  }

  if (isAuthenticated && user) {
    return <>{children}</>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <p className="text-white">Please log in to access this page.</p>
    </div>
  );
};
