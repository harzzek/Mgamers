"use client";

import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { login as loginStore, logout as logoutStore, authenticateUserToken } from '../stores/authStore';
import axiosInstance from '@/stores/axiosInstance';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  birthdate: string;
  roles: string[];
}

interface AuthContextProps {
  userToken: string | null;
  user: User | null;
  login: (username: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  userToken: null,
  user: null,
  login: async () => { },
  logout: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect( () => {
    // On mount, check if there's a token in localStorage
    const token = localStorage.getItem('mgamersToken');
    const user = localStorage.getItem('mgamersUser');

    if (token && user) {
      // If there is, set the token and user in state

      setUserToken(token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const fetchUser = async () => {
        console.log('authenticating user token');
        try {
          const response = await authenticateUserToken();
          setUser(response.data.user);
        } catch (error) {
          console.error(error);
          logout();
        }
      };

      fetchUser();
    }

    

  }, []);

  const login = async (username: string, password: string, rememberMe: boolean) => {
    try {
      const data = await loginStore(username, password, rememberMe);
      const token = data.returnObject.usertoken;
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
    setUserToken(null);
    setUser(null);
    logoutStore();

    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, userToken, login, logout} }>
      {children}
    </AuthContext.Provider>
  );
};
