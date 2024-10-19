// src/app/services/authService.ts

import axios from 'axios';
import axiosInstance from './axiosInstance';

const API_URL = 'http://localhost:8080/api/Account';

export const login = async (username: string, password: string, rememberMe: boolean) => {
  const response = await axiosInstance.post(`${API_URL}/Login`, {
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


export const register = async (name: string, username: string, password: string, email: string, birthdate: string) => {
  const response = await axios.post(`${API_URL}/Register`, {
    name,
    username,
    password,
    email,
    birthdate,
  });
  return response.data;
}
