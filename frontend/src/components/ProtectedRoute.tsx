import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { PacmanLoader } from "react-spinners";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading, refreshAuth, user } = useAuth();
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

  if (loading || isVerifying || !verificationComplete) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
          <PacmanLoader color='#e398ae'/>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
