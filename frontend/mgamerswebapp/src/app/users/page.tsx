'use client';
import React, {useEffect, useState} from 'react';
import UserCard from './components/UserCard';
import { fetchUsers , fetchUserById } from '@/stores/userStore';
import { AuthContext } from '@/context/AuthContext';

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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                console.log('Fetching users...');
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch users.');
            } finally {
                setLoading(false);
            }
        };
        getUsers();
    }, []);

    if (loading) {
        return <div className="container mx-auto px-4 py-6">Loading users...</div>;
    }

    if (error) {
        return <div className="container mx-auto px-4 py-6">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Users</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <a href={`users/${user.id}`} key={user.id}>
                        <UserCard  user={user} />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default UsersPage;
