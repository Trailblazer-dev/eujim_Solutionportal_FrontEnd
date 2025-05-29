import React, { createContext, useState, useEffect, ReactNode } from 'react';
import authApi from '../api/auth';
import type { NavigateFunction } from 'react-router-dom';
import { setAuthState, clearAuthState } from '../utils/auth';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
  registerEmployer: (employerData: any) => Promise<void>;
  setNavigate: (navigate: NavigateFunction) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  registerEmployer: async () => {},
  setNavigate: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [navigate, setNavigate] = useState<NavigateFunction | null>(null);

  useEffect(() => {
    // Check if user is already logged in on initial load
    const checkAuthStatus = async () => {
      setLoading(true);
      try {
        const userData = await authApi.getCurrentUser();
        if (userData) {
          setUser(userData.user);
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.login({ email, password });
      setUser(response.user);
      
      // Set auth state in localStorage for persistent login
      const userType = response.user.role === 'jobseeker' ? 'graduate' : 
                       response.user.role === 'employer' ? 'employer' : 'admin';
      
      const authState = {
        isAuthenticated: true,
        userType: userType,
        userId: response.user.id.toString(),
        token: response.token,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
      };
      
      // Use the imported function directly
      setAuthState(authState);
      
      // Redirect based on user role if navigate is available
      if (navigate) {
        if (response.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (response.user.role === 'employer') {
          navigate('/employer');
        } else {
          navigate('/graduate');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
      setUser(null);
      
      // Use the imported function directly
      clearAuthState();
      
      if (navigate) {
        navigate('/auth/login');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    try {
      await authApi.register(userData);
      if (navigate) {
        navigate('/auth/login');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const registerEmployer = async (employerData: any) => {
    setLoading(true);
    setError(null);
    try {
      await authApi.registerEmployer(employerData);
      if (navigate) {
        navigate('/auth/login');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Employer registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        register,
        registerEmployer,
        setNavigate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};