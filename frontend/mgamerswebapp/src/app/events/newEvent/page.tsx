'use client'

import { useState } from "react";
import NewEventForm from "@/app/components/forms/NewEventForm";
import { createEvent } from "@/stores/eventStore";
import axios, { AxiosError } from "axios";
import { NewEventDTO } from "@/DTOs/eventDTO"; 

export default function NewEvent() {

    const [error, setErrorMessage] = useState("");
    const [created, setCreated] = useState(false);

    const handleSubmit = async (data: NewEventDTO) => {
        try {
            await createEvent(data);
            setCreated(true);
            console.log(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.data) {
                    setErrorMessage(axiosError.response.data as string);
                } else {
                    setErrorMessage("An error occurred while creating the event");
                }
            } else {
                setErrorMessage("An error occurred while creating the event");
            }
        }
    }


    return (
        <div className="container mx-auto px-4 py-6">
            {created && <div color="success" className="mb-4 text-sm">Event created successfully!</div>}
            {error && <div color="warning" className="mb-4 text-sm">{error}</div>}

            <h1 className="text-2xl font-bold mb-6">Create a New Event</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <NewEventForm onSubmit={handleSubmit} submitted={created} />
            </div>
        </div>
    );
}