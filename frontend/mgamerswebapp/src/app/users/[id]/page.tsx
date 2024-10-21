'use client';
import { useEffect, useState } from "react";
import { fetchUserById } from '@/stores/userStore';

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    birthdate: string;
    // Users have many roles
    roles: Role[];
    avatarUrl?: string;
}

interface UserDetailsProps {
    params: {
        id: number;
    };
}

export default function UserDetails({params}: UserDetailsProps){

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{

        const getUser = async () => {
            try {
                console.log('Fetching user...');
                const fetchedUser = await fetchUserById(params.id);
                setUser(fetchedUser);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch user.');
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, []);

    if (loading) {
        return <div>Loading user...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div>
            <h1>User Details</h1>
            <div>
                <h2>{user?.name}</h2>
                <p>{user?.username}</p>
                <p>{user?.email}</p>
                <p>{user?.birthdate}</p>
                <img src={user?.avatarUrl} alt="avatar" />
            </div>
        </div>
    );
}