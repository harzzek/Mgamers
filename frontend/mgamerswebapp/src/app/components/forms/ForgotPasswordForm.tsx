"use client";

import { Button, Divider, Form, Input } from '@heroui/react';
import { useState } from 'react';

interface ForgotPasswordProps {
    onSubmit: (data: { email: string }) => void;
}

export default function ForgotPasswordForm({ onSubmit }: ForgotPasswordProps) {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ email });
    };

    return (
        <Form onSubmit={handleSubmit} validationBehavior='aria'>
            <Input
                isRequired
                type="email"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="my@email.com"
                onChange={(e) => setEmail(e.target.value)}
            >
            </Input>

            <Divider className='my-4'/>

            <Button type="submit" color="primary">
                Send email
            </Button>
        </Form>
    )
}