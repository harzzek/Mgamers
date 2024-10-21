import axiosInstance from "./axiosInstance";

const API_URL = "http://localhost:8080/api/Event";

export const fetchEvents = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    const json = response.data;
    return json;
};

export const fetchEventById = async (id: number) => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
};


export const createEvent = async (data: { name: string; description: string; location: string; startDate: string; endDate: string; startTime: string; endTime: string }) => {
    const response = await axiosInstance.post(`${API_URL}`, data);
    return response.data;
};

export const registerForEvent = async (eventId: number, userId: number) => {
    const response = await axiosInstance.post(`http://localhost:8080/api/Registration`, { userId, eventId });
    return response.data;
};