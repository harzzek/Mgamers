'use client';

import { useState } from "react";

interface NewEventFormProps {
    onSubmit: (data: { name: string; description: string; location: string; startDate: string; endDate: string; startTime: string; endTime: string; tableAmount: number; }) => void;
}

export default function NewEventForm({ onSubmit }: NewEventFormProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [tables, setTables] = useState(0);

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        console.log("Date: " + startDate)
        onSubmit({ name, description, location, startDate, endDate, startTime, endTime, tableAmount: tables });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-2">
                <label>Name</label>
                <input
                    type="text"
                    className="mt-1 w-full rounded-md text-neutral-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="mt-2">
                <label>Description</label>
                <input
                    type="text"
                    className="mt-1 w-full rounded-md text-neutral-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div className="mt-2">
                <label>Location</label>
                <input
                    type="text"
                    className="mt-1 w-full rounded-md text-neutral-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
            </div>
            
            <div className="mt-2">
                <label>Start Date</label>
                <input
                    type="date"
                    className="mt-1 w-full rounded-md text-neutral-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
            </div>

            <div className="mt-2">
                <label>End Date</label>
                <input
                    type="date"
                    className="mt-1 w-full rounded-md text-neutral-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
            </div>

            <div className="mt-2">
                <label>Start Time</label>
                <input
                    type="time"
                    className="mt-1 w-full rounded-md text-neutral-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />
            </div>

            <div className="mt-2">
                <label>End Time</label>
                <input
                    type="time"
                    className="mt-1 w-full rounded-md text-neutral-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                />
            </div>

            <div className="mt-2">
                <label>Tables</label>
                <input
                    type="number"
                    className="mt-1 w-full rounded-md text-neutral-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={tables}
                    onChange={(e) => setTables(parseInt(e.target.value))}
                    required
                />
            </div>

            <button
                type="submit"
                disabled={submitted}
                className="disabled:bg-gray-800 disabled:text-gray-500 mt-4 w-full bg-indigo-600 text-white font-semibold p-2 rounded-md hover:bg-indigo-700">
                Create Event
            </button>

        </form>
    );
}