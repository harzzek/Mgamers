"use client";

import { useState } from 'react';
import Modal from '../common/Modal';
import RegisterForm from '../forms/RegisterForm';
import { register as registerService } from '@/stores/authStore';
import axios, { AxiosError } from 'axios';

interface RegistermodalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegistermodalProps) {

    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async (data: { name: string; username: string; password: string; email: string, birthday: string }) => {
        try {
            await registerService(data.name, data.username, data.password, data.email, data.birthday);
            setOpen(true)
            onClose();
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error))
                setErrorMessage(error.response?.data[0].description);
        }
    }


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} title="Register">
                {errorMessage &&
                    <div className="mb-4 text-sm text-red-600">
                        {errorMessage}
                    </div>
                }
                <RegisterForm onSubmit={handleRegister} />
            </Modal>
            <Modal isOpen={open} title='Email confirmation sent' onClose={() => setOpen(false)}>
                <p className='text-success'>Remember to check your email</p>
            </Modal>
        </>
    );
}
