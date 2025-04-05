import { changePasswordDTO } from "@/app/users/interfaces/changePassword";
import axiosInstance from "./axiosInstance";

const API_URL = '/Account';

export const postForgotPassword = async (data: {email: string}) => {
    const response = await axiosInstance.post(`${API_URL}/ForgotPassword`, data);
    return response.data;
};

export const changePassword = async (data: changePasswordDTO) => {
    const response = await axiosInstance.post(`${API_URL}/ResetPassword`, data);
    return response.data;
}