"use client";

import { Button, Divider, Form, Input } from '@heroui/react';
import {useState} from 'react';

interface LoginFormProps {
    onSubmit: (data: { username: string; password: string; }) => void;
}

export default function LoginForm( {onSubmit}: LoginFormProps) {
    //form variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    //once everything is filled out, we can submit the form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ username, password });
    };

    return (
        <Form onSubmit={handleSubmit} validationBehavior='aria'>
            <Input
                isRequired
                errorMessage="Please enter valid username"
                label="Username"
                labelPlacement="outside"
                name='username'
                placeholder='Enter username'
                type="text"
                onChange={(e) => setUsername(e.target.value)}
            >
            </Input>

            <Input
                isRequired
                errorMessage="Please enter valid password"
                label="Password"
                labelPlacement="outside"
                name='password'
                placeholder='Enter password'
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            >
            </Input>

            <Divider className="my-4"/>

            <Button type="submit" color="primary">
                Login
            </Button>
        </Form>

    );
}