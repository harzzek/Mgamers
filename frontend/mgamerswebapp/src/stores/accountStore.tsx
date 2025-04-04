import axiosInstance from "./axiosInstance";

const API_URL = '/Account';

export const postForgotPassword = async (data: {email: string}) => {
    const response = await axiosInstance.post(`${API_URL}/ForgotPassword`, data);
    return response.data;
};