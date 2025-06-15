import { ParticipantUser } from "./user";

export interface Event {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
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