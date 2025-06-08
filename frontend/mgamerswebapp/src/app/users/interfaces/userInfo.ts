interface User {
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

interface Role {
    id: number;
    name: string;
}