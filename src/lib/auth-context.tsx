import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  provider?: 'email' | 'google' | 'facebook';
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: Partial<User>, password: string) => Promise<void>;
  socialLogin: (provider: 'google' | 'facebook', userData: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem("lifepulse_token");
    const userData = localStorage.getItem("lifepulse_user");
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("lifepulse_token");
        localStorage.removeItem("lifepulse_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulate authentication with localStorage for demo purposes
      // In production, this would make a real API call
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Create mock user data
      const userData: User = {
        id: Date.now().toString(),
        email: email,
        firstName: email.split('@')[0].split('.')[0] || 'User',
        lastName: email.split('@')[0].split('.')[1] || '',
        provider: 'email',
        joinDate: new Date().toISOString()
      };

      // Simulate successful login
      setUser(userData);
      setIsAuthenticated(true);
      
      // Store in localStorage
      localStorage.setItem("lifepulse_token", `token_${Date.now()}`);
      localStorage.setItem("lifepulse_user", JSON.stringify(userData));
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("lifepulse_token");
    localStorage.removeItem("lifepulse_user");
  };

  const signup = async (userData: Partial<User>, password: string) => {
    try {
      // Simulate account creation with localStorage for demo purposes
      if (!userData.email || !password) {
        throw new Error('Email and password are required');
      }

      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName || userData.email.split('@')[0],
        lastName: userData.lastName || '',
        provider: 'email',
        joinDate: new Date().toISOString()
      };

      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("lifepulse_token", `token_${Date.now()}`);
      localStorage.setItem("lifepulse_user", JSON.stringify(newUser));
      
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const socialLogin = async (provider: 'google' | 'facebook', userData: User) => {
    try {
      // In a real app, validate the social login token with your backend
      const userWithDefaults = {
        ...userData,
        provider,
        joinDate: userData.joinDate || new Date().toISOString()
      };

      setUser(userWithDefaults);
      setIsAuthenticated(true);
      localStorage.setItem("lifepulse_token", `${provider}-token-${Date.now()}`);
      localStorage.setItem("lifepulse_user", JSON.stringify(userWithDefaults));
    } catch (error) {
      console.error('Social login error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      loading, 
      login, 
      logout, 
      signup, 
      socialLogin 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
