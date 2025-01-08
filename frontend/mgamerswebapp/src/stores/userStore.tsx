import axiosInstance from './axiosInstance';

const API_URL = 'http://87.59.249.95:8080/api/User';

export const fetchUsers = async () => {
  const response = await axiosInstance.get(`${API_URL}`);
  const json = response.data;
  return json;
};

export const fetchUserById = async (id: number) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

