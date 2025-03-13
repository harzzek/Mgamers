'use client';
import { useEffect, useState } from "react";
import { fetchUserById } from '@/stores/userStore';
import { useAuth } from "@/context/AuthContext";
import { fetchRoles, upgradeUserRole } from "@/stores/adminStore";

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

export default function UserDetails({ params }: UserDetailsProps) {
    const { user } = useAuth()
    const [mgUser, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [assignableRoles, setAssignableRoles] = useState<Role[]>([]);
    const [unassignableRoles, setUnassignableRoles] = useState<Role[]>([]);
    const [selectedRoleUpgrade, setSelectedRoleUpgrade] = useState<string>("");

    useEffect(() => {

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

    }, [params.id]);

    useEffect(() => {
        const setRoles = async () => {
            if (!mgUser) return; // Ensure we have a user before proceeding
    
            try {
                const possibleRoles:Role[] = await fetchRoles();
                const userRoleIds = new Set(mgUser.roles.map(role => role.name));
    
                setAssignableRoles(possibleRoles.filter(role => !userRoleIds.has(role.name)));
                setUnassignableRoles(possibleRoles.filter(role => userRoleIds.has(role.name)));
            } catch (err) {
                console.error('Failed to fetch roles:', err);
            }
        };
    
        setRoles();
    }, [mgUser]);

    const handleRoleAssignment = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!mgUser || !selectedRoleUpgrade) return;
    
        try {
            await upgradeUserRole(mgUser.id+"", selectedRoleUpgrade);
            console.log(`Role ${selectedRoleUpgrade} assigned to user ${mgUser.name}`);
            
            // Update UI after role change
            setUser({
                ...mgUser,
                roles: [...mgUser.roles, { id: Date.now(), name: selectedRoleUpgrade }] // Assuming role ID is unknown
            });
    
            // Remove assigned role from assignableRoles
            setAssignableRoles(assignableRoles.filter(role => role.name !== selectedRoleUpgrade));
            setUnassignableRoles([...unassignableRoles, { id: Date.now(), name: selectedRoleUpgrade }]);
        } catch (error) {
            console.error(error);
            setError("Error assigning role");
        }
    };

    if (loading) {
        return <div>Loading user...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className="container mx-auto px-4 py-8 bg-stone-600 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-stone-700 text-white shadow-lg rounded-lg overflow-hidden p-8">
                <h2 className="text-3xl font-bold text-stone-100 mb-2 text-center">{mgUser?.name}</h2>
                <p className="text-lg text-stone-300 text-center">@{mgUser?.username}</p>
                <div className="mt-6 border-t border-stone-500 pt-4 text-center">
                    <p className="text-stone-300 text-lg"><span className="font-semibold text-stone-200">Email:</span> {mgUser?.email}</p>
                    <p className="text-stone-300 text-lg mt-2"><span className="font-semibold text-stone-200">Birthdate:</span> {mgUser?.birthdate}</p>
                </div>
            </div>
            {user?.userRoles.find(role => role.includes('Admin')) &&
                <div>
                    <div className="ml-8 p-6 bg-stone-700 text-white shadow-lg rounded-lg w-96">
                    <h3 className="text-xl font-bold mb-4">Assign Role</h3>
                    <select 
                        className="w-full p-2 text-black rounded-lg mb-4" id="role-select"
                        value={selectedRoleUpgrade}
                        onChange={(e) => setSelectedRoleUpgrade(e.target.value)}
                    >
                        <option value="">Select a role</option>
                        {assignableRoles.map((role) => (
                            <option key={role.name} value={role.name}>{role.name}</option>
                        ))}
                    </select>
                    <button 
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                        onClick= {handleRoleAssignment}
                    >
                        Assign Role
                    </button>
                </div>
                </div>
            }
        </div>
    );
}