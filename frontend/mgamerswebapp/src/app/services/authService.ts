// src/app/services/authService.ts

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/Account';

export const login = async (username: string, password: string, rememberMe: boolean) => {
  const response = await axios.post(`${API_URL}/Login`, {
    username,
    password,
    rememberMe,
  });
  return response.data;
};

export const logout = () => {
  // Remove the token from localStorage
  localStorage.removeItem('mgamersToken');
};
