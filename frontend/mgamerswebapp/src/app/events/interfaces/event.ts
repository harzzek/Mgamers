import { ParticipantUser, User } from "./user";

export interface Event {
    id: number;
    name: string;
    description: string;
    startDate: String;
    endDate: String;
    startTime: string;
    endTime: string;
    location: string;
    participants: registration[];
    tables: Table[];
    // Add other event properties as needed
  }

export interface registration{
    userId: number;
    eventId: number;
    seatId: number;
    user: ParticipantUser;
}

export interface Table{
    id: number;
    seats: Seat[];
}

export interface Seat{
    id: number;
    user?: ParticipantUser
    occupied: boolean;
}