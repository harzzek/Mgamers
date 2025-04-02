'use client';
import React, {useEffect, useState} from 'react';
import UserCard from './components/UserCard';
import { fetchUsers  } from '@/stores/userStore';

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

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getUsers = async () => {
            try {
                console.log('Fetching users...');
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getUsers();
    }, []);

    if (loading) {
        return <div className="container mx-auto px-4 py-6">Loading users...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Brugere</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (    
                    <UserCard user={user} key={user.id}/>
                ))}
            </div>
        </div>
    );
};

export default UsersPage;
