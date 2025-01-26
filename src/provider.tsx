import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLastTokenStore } from './store'; 
import jwt from 'jsonwebtoken';
import { RouteConfig } from './config'; 
import { useCookies } from 'react-cookie';

interface LastContextType {
  isAuthenticated: boolean | null; 
  config: RouteConfig | null; 
}

const LastContext = createContext<LastContextType | undefined>(undefined);

interface LastProviderProps {
  children: React.ReactNode; 
  config: RouteConfig | null; 
}

export const LastProvider: React.FC<LastProviderProps> = ({ children, config }) => {
  const { setLastToken } = useLastTokenStore(); 
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); 
  const [cookies] = useCookies(['access']); 

  useEffect(() => {
    const cookieToken = cookies['access'];
    if (cookieToken) {
      const localToken = jwt.sign({ data: cookieToken }, String(process?.env?.NEXT_PUBLIC_LAST_SECRET_KEY), { expiresIn: '1h' });
      setLastToken(localToken); 
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false); 
    }
  }, [cookies, setLastToken]);

  const updatedConfig = { ...config, isAuthenticated };

  const contextValue = {
    isAuthenticated,
    config: updatedConfig,
  };

  return (
    <LastContext.Provider value={contextValue as LastContextType}>
      {children} 
    </LastContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(LastContext);
  if (!context) {
    throw new Error('useAuth must be used within a LastProvider');
  }
  return context;
};