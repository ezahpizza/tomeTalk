import { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AuthState } from '@/types';
import { authAPI } from '@/services/api';
import { authStorage, extractErrorMessage } from '@/utils';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  refreshAuth: () => Promise<boolean>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryClient = useQueryClient();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false); 

  const verifyToken = useCallback(async (token: string) => {
    try {
      const response = await authAPI.getMe();
      if (response.success) {
        setAuthState(prev => ({
          ...prev,
          user: response.data,
          isAuthenticated: true,
          token: token,
        }));
        authStorage.store(token, response.data);
        return true;
      }
      return false;
    } catch (error) {

      authStorage.clear();
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
      });
      return false;
    }
  }, []);

  const refreshAuth = useCallback(async (): Promise<boolean> => {
    setLoading(true);
    try {
      const authData = authStorage.retrieve();
      if (authData) {
        const isValid = await verifyToken(authData.token);
        setLoading(false);
        return isValid;
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          token: null,
        });
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Auth refresh error:', error);
      authStorage.clear();
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
      });
      setLoading(false);
      return false;
    }
  }, [verifyToken]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const authData = authStorage.retrieve();
        
        if (authData) {

          setAuthState({
            isAuthenticated: true,
            user: authData.user,
            token: authData.token,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            token: null,
          });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authStorage.clear();
        setAuthState({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();
  }, []); 

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.success) {
        const { token, ...user } = response.data;
        
        authStorage.store(token, user);
        
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
    } catch (error) {
      setError(extractErrorMessage(error, 'Login failed'));
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
        
        authStorage.store(token, user);
        
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
    } catch (error) {
      setError(extractErrorMessage(error, 'Signup failed'));
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    authStorage.clear();
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    setError(null);
    
    queryClient.clear();
  };

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    refreshAuth,
    loading: loading || !initialized, 
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};