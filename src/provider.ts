import React, { createContext, useContext, useEffect, useState } from 'react';
import { useStore } from 'store'; 
import jwt from 'jsonwebtoken';
import { RouteConfig } from './config'; 

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
  const { setToken } = useStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(config.isAuthenticated); 

  useEffect(() => {
    const cookieToken = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (cookieToken) {
      const validToken = cookieToken.split('=')[1];
      const localToken = jwt.sign({ data: validToken }, 'your-secret-key', { expiresIn: '1h' });
      setToken(localToken);
      setIsAuthenticated(true);
    }
  }, [setToken]);

  const updatedConfig = { ...config, isAuthenticated };

  return (
    <AuthContext.Provider value={{ isAuthenticated, config: updatedConfig }}>
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