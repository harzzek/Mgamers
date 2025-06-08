import { UpdateUserDTO } from '@/DTOs/updateUserInfoDTO';
import axiosInstance from './axiosInstance';

const API_URL = '/User';

export const fetchUsers = async () => {
	const response = await axiosInstance.get(`${API_URL}`);
	const json = response.data;
	return json;
};

export const fetchUserById = async (id: number) => {
	const response = await axiosInstance.get(`${API_URL}/${id}`);
	return response.data;
};

export const deleteUser = async (id: number) => {
	const response = await axiosInstance.delete(`${API_URL}/${id}`);
	return response.data;
}

export const updateUserById = async (id: number, data: UpdateUserDTO) => {
	const response = await axiosInstance.put(`${API_URL}/${id}`, data);
	return response.data;
}