"use client";
import { Button, Divider, Form, Input } from '@heroui/react';
import { useState } from 'react';
import axios from 'axios';

interface RegisterFormProps {
    onSubmit: (data: { name: string; username: string; password: string; email: string, birthday: string }) => void;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [error, setError] = useState('');
    const [invalidCombo, setInvalidCombo] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (confirmPassword === password) {
            try {
                onSubmit({ name, username, password, email, birthday });
            } catch (error) {
                if (axios.isAxiosError(error))
                    setError(error.response?.data[0].description);
                console.log(error)
            }

        } else {
            setError("Ikke ens");
            setInvalidCombo(true);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit} validationBehavior='aria' className='py-5'>
                <Input
                    isRequired
                    type='text'
                    errorMessage='Please enter valid name'
                    label='Name'
                    labelPlacement='outside'
                    name='name'
                    placeholder='Enter name'
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    isRequired
                    type='text'
                    errorMessage='Please enter valid username'
                    label='Username'
                    labelPlacement='outside'
                    name='username'
                    placeholder='Enter username'
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                    isRequired
                    type='password'
                    errorMessage={error}
                    label='Password'
                    labelPlacement='outside'
                    isInvalid={invalidCombo}
                    name='password'
                    placeholder='Enter password'
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Input
                    isRequired
                    type='password'
                    errorMessage={error}
                    label='Confirm password'
                    isInvalid={invalidCombo}
                    labelPlacement='outside'
                    name='confirm password'
                    placeholder='Reenter password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Input
                    isRequired
                    type='email'
                    errorMessage='Please enter email'
                    label='Email'
                    labelPlacement='outside'
                    name='email'
                    placeholder='Enter email'
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    isRequired
                    type='date'
                    errorMessage='Please set your birthday'
                    label='Birthday'
                    labelPlacement='outside'
                    name='birthday'
                    placeholder='Set your birthday'
                    className='text-foreground-500'
                    onChange={(e) => setBirthday(e.target.value)}
                />

                <Divider className='my-4' />

                <Button type="submit" color="success">
                    Create account
                </Button>
            </Form>
        </>
    );
}
