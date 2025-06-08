'use client';

import { useEffect, useState } from "react";
import { Button, Divider, Form, Input } from "@heroui/react";
import ConfirmModal from "../modals/ConfirmModal";
import { useRouter } from 'next/navigation';
import { UpdateUserDTO } from "@/DTOs/updateUserInfoDTO"
import { fetchUserById } from "@/stores/userStore";


interface UpdateUserFormProps {
    userId: number;
    onSubmit:(data: UpdateUserDTO) => void;
    submitted: boolean;
}

export default function UpdateUserInformationForm({ userId, onSubmit, submitted }: UpdateUserFormProps){
    const [name, setName] = useState('');
    const [address, setAdress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [postNumber, setPostNumber] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
    
            const getUser = async () => {
                try {
                    console.log('Fetching user...');
                    const fetchedUser : User = await fetchUserById(userId);
                    setName(fetchedUser.name);
                    if(fetchedUser.address){
                        setAdress(fetchedUser.address);
                    }
                    if(fetchedUser.postNumber){
                        setPostNumber(fetchedUser.postNumber);
                    }
                    if(fetchedUser.phoneNumber){
                        setPhoneNumber(fetchedUser.phoneNumber);
                    }
                } catch (err) {
                    console.error(err);
                }
            };
            getUser();
    
        }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setConfirmOpen(true);
    }

    const handleUpdateUser = () => {
        if (name) {
            const updatedInfo: UpdateUserDTO = {
                name: name,
                address: address,
                phoneNumber: phoneNumber,
                postNumber: postNumber
            }

            onSubmit(updatedInfo)
            router.push('/')
        }

    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Input
                    isRequired
                    type='text'
                    errorMessage='Please enter valid name'
                    label='Navn'
                    labelPlacement='outside'
                    name='name'
                    placeholder='Navn'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <Input
                    type='text'
                    errorMessage='Please enter valid address'
                    label='Addresse'
                    labelPlacement='outside'
                    name='address'
                    placeholder='Addresse'
                    onChange={(e) => setAdress(e.target.value)}
                    value={address}
                />

                <Input
                    type='text'
                    errorMessage='Du skal have et dansk telefon nummer'
                    label='Telefon nummer'
                    labelPlacement='outside'
                    name='Telefon nummer'
                    placeholder='Nummer'
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                />

                <Input
                    type='text'
                    errorMessage='Du skal have et dansk post nummer'
                    label='Post nummer'
                    labelPlacement='outside'
                    name='Post nummer'
                    placeholder='Nummer'
                    onChange={(e) => setPostNumber(e.target.value)}
                    value={postNumber}
                />
                <Divider className="my-4" />
                <Button type="submit" color="primary" disabled={submitted}>
                    Opdater info
                </Button>
            </Form>
            <ConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} title='Er du sikker?' message='Du er igang med at ændre din information. Dette bliver lagt i vores database. Se information for yderligere.' onConfirm={() => handleUpdateUser()}/>
        </>
    );

}