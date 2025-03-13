import axiosInstance from "./axiosInstance";

const API_URL = "/Admin";

export const fetchRoles = async () => {
    const response = await axiosInstance.get(`${API_URL}/Roles`);
    const json = response.data;
    return json;
};

export const upgradeUserRole = async ( userId: string, role: string) => {
    const response = await axiosInstance.post(`${API_URL}/UpgradeUserRole`, {userId, role});
    return response.data;
};