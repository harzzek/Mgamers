// src/app/services/authService.ts

import axiosInstance from './axiosInstance';

const API_URL = '/Account';

export const login = async (username: string, password: string) => {
  const response = await axiosInstance.post(`${API_URL}/Login`, {
    username,
    password,
    });
  return response.data;
};

export const logout = () => {
  // Remove the token from localStorage
  localStorage.removeItem('mgamersToken');
  localStorage.removeItem('mgamersUser');
};


export const register = async (name: string, username: string, password: string, email: string, birthdate: string) => {
  const response = await axiosInstance.post(`${API_URL}/Register`, {
    name,
    username,
    password,
    email,
    birthdate,
  });
  return response.data;
}

export const authenticateUserToken = async () =>{
  const response = await axiosInstance.get(`${API_URL}/UserTokenValidation`);
  return response;
}