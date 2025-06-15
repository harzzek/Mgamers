import { EventInfo, NewEventDTO } from "@/DTOs/eventDTO";
import axiosInstance from "./axiosInstance";
import { Event } from "@/app/events/interfaces/event";

const API_URL = "/Event";

const API_URL_REGISTRATION = "/Registration";

export const fetchEvents = async (): Promise<Event[]> => {
    const response = await axiosInstance.get(`${API_URL}`);
    const json = response.data;
    return json;
};

export const fetchUpcomingEvents = async (x?: number): Promise<Event[]> => {
    const url = x ? `${API_URL}/Upcoming/?x=${x}` : `${API_URL}/Upcoming`;
    const response = await axiosInstance.get<Event[]>(url);

    return response.data.map((eventItem) => ({
        ...eventItem,
        startDate: new Date(eventItem.startDate),
        endDate: new Date(eventItem.endDate),
    }));
};
export const fetchEventById = async (id: number): Promise<EventInfo> => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return {
        ...response.data,
        startDate: new Date(response.data.startDate),
        endDate: new Date(response.data.endDate)
    } as EventInfo;
};

export const fetchNextEvent = async (): Promise<Event> => {
    const response = await axiosInstance.get(`${API_URL}/NextEvent`)
    return {
        ...response.data,
        startDate: new Date(response.data.startDate),
        endDate: new Date(response.data.endDate)
    } as Event;
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