import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, AuthState } from '@/types';
import { authAPI } from '@/services/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyToken = useCallback(async () => {
    try {
      const response = await authAPI.getMe();
      if (response.success) {
        setAuthState(prev => ({
          ...prev,
          user: response.data,
        }));
      }
    } catch (error) {
      logout();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setAuthState({
          isAuthenticated: true,
          user,
          token,
        });
        // Verify token is still valid
        verifyToken();
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, [verifyToken]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.success) {
        const { token, ...user } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        setAuthState({
          isAuthenticated: true,
          user,
          token,
        });
        
        setLoading(false);
        return true;
      } else {
        setError(response.message || 'Login failed');
        setLoading(false);
        return false;
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Login failed'
        : 'Login failed';
      setError(errorMessage);
      setLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.signup({ name, email, password });
      
      if (response.success) {
        const { token, ...user } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        setAuthState({
          isAuthenticated: true,
          user,
          token,
        });
        
        setLoading(false);
        return true;
      } else {
        setError(response.message || 'Signup failed');
        setLoading(false);
        return false;
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Signup failed'
        : 'Signup failed';
      setError(errorMessage);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    setError(null);
  };

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};