import { registration, Table } from "@/app/events/interfaces/event";

export interface NewEventDTO {
    name: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    tableAmount: number;
}

export interface EventInfo{
    id: number;
    name: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
    participants: registration[];
    tables: Table[]
}