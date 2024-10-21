import { User } from "./user";

export interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
    imageUrl?: string;
    participants: User[];
    // Add other event properties as needed
  }

  //