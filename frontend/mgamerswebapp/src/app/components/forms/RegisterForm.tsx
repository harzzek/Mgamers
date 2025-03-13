"use client";

import { useState } from 'react';

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (confirmPassword === password) {
            onSubmit({ name, username, password, email, birthday });
        } else {
            setError("Skriv dit password igen, TAK")
        }
    };

    return (
        <>
            {error &&
                (
                    <div className="mb-4 text-sm text-red-600">
                        {error}
                    </div>
                )}
            <form onSubmit={handleSubmit}>
                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-300">Name</label>
                    <input
                        type="text"
                        className="mt-1 w-full rounded-md text-neutral-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-300">Username</label>
                    <input
                        type="text"
                        className="mt-1 w-full rounded-md text-neutral-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-300">Password</label>
                    <input
                        type="password"
                        className="mt-1 w-full rounded-md text-neutral-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-300">Confirm password</label>
                    <input
                        type="password"
                        className="mt-1 w-full rounded-md text-neutral-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-300">Email</label>
                    <input
                        type="email"
                        className="mt-1 w-full rounded-md text-neutral-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-300">Birthday</label>
                    <input
                        type="date"
                        className="mt-1 w-full rounded-md text-neutral-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
                    >
                        Register
                    </button>
                </div>
            </form>
        </>
    );
}
