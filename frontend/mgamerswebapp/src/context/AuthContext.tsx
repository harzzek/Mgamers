"use client";

import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService } from '../services/authService';

interface AuthContextProps {
  isAuthenticated: boolean;
  userToken: string | null;
  login: (username: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  userToken: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    // On mount, check if there's a token in localStorage
    const token = localStorage.getItem('mgamersToken');

    if (token) {
      // If there is, set the token and isAuthenticated to true if it is not expired

      setUserToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string, rememberMe: boolean) => {
    try {
      const data = await loginService(username, password, rememberMe);
      const token = data.returnObject.usertoken;

      setUserToken(token);
      setIsAuthenticated(true);

      // Store the token in localStorage
      localStorage.setItem('mgamersToken', token);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUserToken(null);
    setIsAuthenticated(false);
    logoutService();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
