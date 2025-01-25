import React, { createContext, useContext, useEffect, useState } from 'react';
import { useStore } from './store'; 
import jwt from 'jsonwebtoken';

interface AccessRoutes {
  [role: string]: string[];
}

interface RouteConfig {
  publicRoutes: string[];
  privateRoutes: string[];
  hybridRoutes: string[];
  loginRoute: string;
  registerRoute: string;
  forgotRoute: string;
  otpRoute: string;
  accessRoutes: AccessRoutes;
}

interface AuthContextType {
  isAuthenticated: boolean;
  config: RouteConfig;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface LastProviderProps {
  children: React.ReactNode;
  config: RouteConfig; 
}

export const LastProvider: React.FC<LastProviderProps> = ({ children, config }) => {
  const { setToken, token } = useStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const cookieToken = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (cookieToken) {
      const validToken = cookieToken.split('=')[1];
      const localToken = jwt.sign({ data: validToken }, 'your-secret-key', { expiresIn: '1h' });
      setToken(localToken);
      setIsAuthenticated(true);
    }
  }, [setToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, config }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a LastProvider');
  }
  return context;
};