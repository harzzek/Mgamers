import { User } from "./user";

export interface Event {
    id: number;
    name: string;
    description: string;
    startDate: String;
    endDate: String;
    startTime: string;
    endTime: string;
    location: string;
    participants: User[];
    // Add other event properties as needed
  }

  //