"use client";

import {useState} from 'react';

interface LoginFormProps {
    onSubmit: (data: { username: string; password: string; rememberMe: boolean }) => void;
}

export default function LoginForm( {onSubmit}: LoginFormProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ username, password, rememberMe });
    };

    return (
        <form onSubmit={handleSubmit}>
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
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
            </div>

            <button type="submit" className="mt-4 w-full bg-indigo-600 text-white font-semibold p-2 rounded-md hover:bg-indigo-700">Login</button>
        </form>

    );
}