import { NewEventDTO } from "@/DTOs/eventDTO";
import axiosInstance from "./axiosInstance";

const API_URL = "/Event";

const API_URL_REGISTRATION = "/Registration";

export const fetchEvents = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    const json = response.data;
    return json;
};

export const fetchUpcomingEvents = async () => {
    const response = await axiosInstance.get(`${API_URL}/Upcoming`);
    const json = response.data;
    return json;
};
export const fetchEventById = async (id: number) => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
};

export const fetchNextEvent = async () => {
    const response = await axiosInstance.get(`${API_URL}/NextEvent`)
    return response.data;
};


export const createEvent = async (data: NewEventDTO) => {
    const response = await axiosInstance.post(`${API_URL}`, data);
    return response.data;
};

export const registerForEvent = async (eventId: number, userId: number, seatids: number[]) => {
    const response = await axiosInstance.post(`${API_URL_REGISTRATION}`, { userId, eventId, seatids });
    return response.data;
};

export const unregisterFromEvent = async (eventId: number, userId: number) => {
    const response = await axiosInstance.delete(`${API_URL_REGISTRATION}`, { data: { userId, eventId } });
    return response.data;

};

export const extendSeat = async (userId: number, eventId: number, seatIds: number[]) => {
    const response = await axiosInstance.post(`${API_URL_REGISTRATION}/admin`, {userId, eventId, seatIds});
    return response.data;
}