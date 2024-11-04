export interface User {
    id: number
    username: string;
    name: string;
    email: string;
    birthdate: string;
    roles: string[];

    // Add other event properties as needed
  }


export interface ParticipantUser{
    id: number;
    username: string;
}
  //id, username, name, email, birthdate, roles