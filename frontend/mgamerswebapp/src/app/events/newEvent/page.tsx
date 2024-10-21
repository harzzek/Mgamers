'use client'

import { useState } from "react";
import NewEventForm from "@/app/components/forms/NewEventForm";
import { createEvent } from "@/stores/eventStore";

export default function NewEvent() {

    const [error, setErrorMessage] = useState("");
    const [created , setCreated] = useState(false);

    const handleSubmit = async (data: { name: string; description: string; location: string; startDate: string; endDate: string; startTime: string; endTime: string }) => {
        try {
            await createEvent(data);
            setCreated(true);
            console.log(data);
        } catch (error) {
            setErrorMessage("Failed to create event.");
        }
    }


    return (
        <div className="container mx-auto px-4 py-6">
            {created && <div className="mb-4 text-sm text-green-600">Event created successfully!</div>}
            {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

            <h1 className="text-2xl font-bold mb-6">Create a New Event</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <NewEventForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}