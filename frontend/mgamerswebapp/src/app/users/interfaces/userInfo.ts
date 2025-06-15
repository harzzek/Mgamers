export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    birthdate: string;
    createdAt: string;
    address: string | null;
    phoneNumber: string | null;
    postNumber: string | null;
    // Users have many roles
    roles: Role[];
}

export interface Role {
    id: number;
    name: string;
}

export interface SimpleUser{
    id: number;
    name: string;
    username: string;
    email: string;
    birthdate: string;
    // Users have many roles
    roles: Role[];
    createdAt: string;
}