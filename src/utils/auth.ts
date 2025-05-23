/**
 * Authentication utilities for the EUJIM Solution Portal
 */

// User types supported by the application
export type UserType = 'graduate' | 'employer' | 'admin' | null;

// Authentication state interface
export interface AuthState {
  isAuthenticated: boolean;
  userType: UserType;
  userId?: string;
  token?: string;
  expiresAt?: number;
}

// Default unauthenticated state
const defaultAuthState: AuthState = {
  isAuthenticated: false,
  userType: null,
  userId: undefined,
  token: undefined,
  expiresAt: undefined,
};

/**
 * Get the current authentication state from localStorage
 * In a production app, you might want to use a more secure storage method
 * or integrate with an authentication service
 */
export const getAuthState = (): AuthState => {
  try {
    const authData = localStorage.getItem('auth');
    if (!authData) return defaultAuthState;
    
    const parsedAuthData = JSON.parse(authData) as AuthState;
    
    // Check if token has expired
    if (parsedAuthData.expiresAt && parsedAuthData.expiresAt < Date.now()) {
      // Token expired, clear auth data
      localStorage.removeItem('auth');
      return defaultAuthState;
    }
    
    return parsedAuthData;
  } catch (error) {
    console.error('Error retrieving auth state:', error);
    return defaultAuthState;
  }
};

/**
 * Save authentication state to localStorage
 * @param authState The authentication state to save
 */
export const setAuthState = (authState: AuthState): void => {
  try {
    localStorage.setItem('auth', JSON.stringify(authState));
  } catch (error) {
    console.error('Error saving auth state:', error);
  }
};

/**
 * Clear authentication state (logout)
 */
export const clearAuthState = (): void => {
  try {
    localStorage.removeItem('auth');
  } catch (error) {
    console.error('Error clearing auth state:', error);
  }
};

/**
 * Check if the user is authenticated and has the required role
 * @param requiredUserType The user type required for access
 */
export const checkUserAccess = (requiredUserType?: UserType): boolean => {
  const { isAuthenticated, userType } = getAuthState();
  
  if (!isAuthenticated) return false;
  if (!requiredUserType) return true; // No specific user type required
  
  return userType === requiredUserType;
};

/**
 * Mock login function - replace with actual API call in production
 * @param email User email
 * @param password User password
 */
export const login = async (
  email: string, 
  password: string
): Promise<AuthState> => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Example validation - replace with actual validation logic
      if (email && password) {
        // Determine user type based on email domain (just an example)
        const userType: UserType = email.includes('employer') 
          ? 'employer' 
          : email.includes('admin') 
            ? 'admin' 
            : 'graduate';
            
        const authState: AuthState = {
          isAuthenticated: true,
          userType,
          userId: '12345',
          token: 'mock-jwt-token',
          expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
        };
        
        setAuthState(authState);
        resolve(authState);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000); // Simulate network delay
  });
};

/**
 * Mock registration function - replace with actual API call in production
 */
export const register = async (userData: any): Promise<AuthState> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const authState: AuthState = {
        isAuthenticated: true,
        userType: userData.userType || 'graduate',
        userId: '12345',
        token: 'mock-jwt-token',
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
      };
      
      setAuthState(authState);
      resolve(authState);
    }, 1000); // Simulate network delay
  });
};

/**
 * Logout the current user
 */
export const logout = (): void => {
  clearAuthState();
  // Additional cleanup if needed
};
