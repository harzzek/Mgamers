'use client';
import { useEffect, useState } from "react";
import { fetchUserById, deleteUser } from '@/stores/userStore';
import { useAuth } from "@/context/AuthContext";
import { fetchRoles, upgradeUserRole } from "@/stores/adminStore";
import { Button, Divider, PressEvent, Select, SelectItem } from "@heroui/react";
import ConfirmModal from "@/app/components/modals/ConfirmModal";
import { useRouter } from 'next/navigation';

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
    const [confirmOpen, setConfirmOpen] = useState(false);
    const router = useRouter();

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
                const possibleRoles: Role[] = await fetchRoles();
                const userRoleIds = new Set(mgUser.roles.map(role => role.name));

                setAssignableRoles(possibleRoles.filter(role => !userRoleIds.has(role.name)));
                setUnassignableRoles(possibleRoles.filter(role => userRoleIds.has(role.name)));
            } catch (err) {
                console.error('Failed to fetch roles:', err);
            }
        };

        setRoles();
    }, [mgUser]);

    const handleRoleAssignment = async () => {

        if (!mgUser || !selectedRoleUpgrade) return;

        try {
            await upgradeUserRole(mgUser.id + "", selectedRoleUpgrade);
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

    const handleDelete = (e: PressEvent) => {
        console.log(e);
        setConfirmOpen(true);
    }

    const handleDeleteUser = async () => {
            try{
                await deleteUser(params.id);
                setConfirmOpen(false);
                router.push('/')
            } catch (error){
                console.log(error);
            }
            
        }

    if (loading) {
        return <div>Loading user...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div>
            <div className="container mx-auto px-4 py-16 flex items-center justify-center">
                <div className="w-full max-w-2xl shadow-lg overflow-hidden p-8 bg-primary-50">
                    <h2 className="text-3xl font-bold  mb-2 text-center">{mgUser?.name}</h2>
                    <p className="text-lg  text-center">@{mgUser?.username}</p>
                    <div className="mt-6 border-t pt-4 text-center">
                        <p className=" text-lg"><span className="font-semibold ">Email:</span> {mgUser?.email}</p>
                        <p className="text-lg mt-2"><span className="font-semibold ">Birthdate:</span> {mgUser?.birthdate}</p>
                        <Divider className="my-4"/>
                        <span className="font-semibold ">Roles:</span>
                        {
                            unassignableRoles.map((role) => (
                                <p key={role.id}>{role.name}</p>
                            ))
                        }
                    </div>
                </div>
                {user?.userRoles.find(role => role.includes('Admin')) &&
                    <div className="ml-8 p-6 bg-primary-50  shadow-lg rounded-lg w-96">
                        <div className="pb-8">
                            <h3>Assign Role</h3>
                            <Select
                                className="w-full p-2 rounded-lg mb-4" id="role-select"
                                value={selectedRoleUpgrade}
                                label="Role"
                                onChange={(e) => setSelectedRoleUpgrade(e.target.value)}
                            >
                                {assignableRoles.map((role) => (
                                    <SelectItem key={role.name}>{role.name}</SelectItem>
                                ))}
                            </Select>
                            <Button
                                color="secondary"
                                className="w-full px-4 py-2"
                                onPress={handleRoleAssignment}
                            >
                                Assign Role
                            </Button>
                        </div>
                        <Divider/>

                        <div className="pt-6">
                            <h3>Delete user</h3>

                            <Button
                                color="danger"
                                className="w-full px-4 py-2"
                                onPress={handleDelete}
                            >
                                Slet bruger
                            </Button>

                        </div>


                    </div>
                }
            </div>
            
            <ConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} title='Du er igang med at slette en bruger' message='Når brugeren er slettet, så kan brugeren ikke længere findes i systemet. Alt historie bliver rydet og kan ikke genoprettes.' onConfirm={() => handleDeleteUser()}/>
        </div>
    );
}
