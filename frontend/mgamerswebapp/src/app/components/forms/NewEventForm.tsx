'use client';

import { useState } from "react";
import DateRangePicker from "../common/DateRangePicker";
import { NewEventDTO } from "@/DTOs/eventDTO";
import { Button, Divider, Form, Input } from "@heroui/react";


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
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [tables, setTables] = useState(0);

    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        

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
            }
        }
    }

    const formatDate = (date: Date) => {
        return date ? date.toISOString().split("T")[0] : "";
    }

    return (
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
                name='discription'
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
            
            <DateRangePicker dateRange={dateRange} setDateRange={setDateRange}/>
            
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
                errorMessage='Please enter a end time'
                label='Tables'
                labelPlacement='outside'
                name='tables'
                placeholder='Tables'
                defaultValue="10"
                onChange={(e) => setTables(parseInt(e.target.value))}
            />

            <Divider className="my-4" />
            <Button type="submit" color="primary" disabled={submitted}>
                Create Event
            </Button>

        </Form>
    );
}