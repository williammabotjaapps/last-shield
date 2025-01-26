import React, { createContext, useContext, useEffect, useState } from 'react';
import { useStore } from './store'; 
import jwt from 'jsonwebtoken';
import { RouteConfig } from './config'; 

interface AuthContextType {
  isAuthenticated: boolean | null; 
  config: RouteConfig | null; 
  children: React.ReactNode; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface LastProviderProps {
  children: React.ReactNode; 
  config: RouteConfig | null; 
}

export const LastProvider: React.FC<LastProviderProps> = ({ children, config }) => {
  const { setToken } = useStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

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

  const contextValue = {
    isAuthenticated,
    config: updatedConfig,
    children 
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children} {/* Render children here */}
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