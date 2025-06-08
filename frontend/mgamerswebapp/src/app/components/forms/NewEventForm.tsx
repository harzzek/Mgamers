'use client';

import { useState } from "react";
import DateRangePicker from "../common/DateRangePicker";
import { NewEventDTO } from "@/DTOs/eventDTO";
import { Button, Divider, Form, Input } from "@heroui/react";
import ConfirmModal from "../modals/ConfirmModal";
import { useRouter } from 'next/navigation';


interface NewEventFormProps {
    onSubmit: (data: NewEventDTO) => void;
    submitted: boolean;
}

export default function NewEventForm({ onSubmit, submitted }: NewEventFormProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [tables, setTables] = useState(0);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setConfirmOpen(true);
    }

    const handleCreateEvent = () => {
        if (startDate != null && endDate != null) {
            const formatedStartDate = formatDate(startDate);
            const formatedEndDate = formatDate(endDate);

            const newEvent: NewEventDTO = {
                name: name,
                description: description,
                endDate: formatedEndDate,
                startDate: formatedStartDate,
                startTime: startTime,
                endTime: endTime,
                location: location,
                tableAmount: tables
            };

            if (startDate && endDate) {

                onSubmit(newEvent);
                router.push('/')
            }
        }
    }

    const formatDate = (date: Date) => {
        return date ? date.toISOString().split("T")[0] : "";
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
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
                    type='text'
                    label='Description'
                    labelPlacement='outside'
                    name='description'
                    placeholder='Beskrivelse'
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Input
                    isRequired
                    type='text'
                    errorMessage='Please enter location'
                    label='Location'
                    labelPlacement='outside'
                    name='location'
                    placeholder='Location'
                    onChange={(e) => setLocation(e.target.value)}
                />

                <DateRangePicker setDateRange={setDateRange} />

                <Input
                    isRequired
                    type='time'
                    errorMessage='Please enter a start time'
                    label='Start time'
                    labelPlacement='outside'
                    name='startTime'
                    placeholder='Start Time'
                    onChange={(e) => setStartTime(e.target.value)}
                />

                <Input
                    isRequired
                    type='time'
                    errorMessage='Please enter a end time'
                    label='End time'
                    labelPlacement='outside'
                    name='endTime'
                    placeholder='End Time'
                    onChange={(e) => setEndTime(e.target.value)}
                />

                <Input
                    isRequired
                    type='number'
                    errorMessage='Ahhh yes numbers go from 1-z... Like your abc, a2c4... Idiot'
                    label='Tables'
                    labelPlacement='outside'
                    name='tables'
                    placeholder='Tables'
                    onChange={(e) => setTables(parseInt(e.target.value))}
                />

                <Divider className="my-4" />
                <Button type="submit" color="primary" disabled={submitted}>
                    Create Event
                </Button>

            </Form>
            <ConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} title='Er du sikker?' message='Når du først har lavet et event, så kan folk tilmelde sig. Det dårlig stil at skulle framelde sig igen.' onConfirm={() => handleCreateEvent()}/>
        </>
    );
}