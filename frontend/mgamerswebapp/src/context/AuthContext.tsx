"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { login as loginStore, logout as logoutStore } from '../stores/authStore';
import axiosInstance from '@/stores/axiosInstance';

interface User {
  id: number;
  userName: string;
  userRoles: string[];
}

interface AuthContextProps {
  userToken: string | null;
  user: User | null;
  isAuthLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps| undefined>( undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  //We need to load the authentication on mount
  useEffect(() => {
    const loadAuth = async () => {
      const storedToken = localStorage.getItem("mgamersToken");
      const storedUser = localStorage.getItem("mgamersUser");

      if (storedToken && storedUser) {
        setUserToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      setIsAuthLoading(false); // Mark loading as complete
    };

    loadAuth();
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const data = await loginStore(username, password);
      const token = data.token;
      const user = data.user;

      setUserToken(token);
      setUser(user);

      // Store the token in localStorage
      localStorage.setItem('mgamersToken', token);
      localStorage.setItem('mgamersUser', JSON.stringify(user));

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    logoutStore();
    setUserToken(null);
    setUser(null);
    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, userToken, isAuthLoading, login, logout} }>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};