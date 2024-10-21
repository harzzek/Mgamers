// components/EventCard.tsx
'use client';
import React, { useState } from 'react';
import { Event } from '../interfaces/event';
import { Button, Description, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                onClick={() => setIsOpen(true)}
            >
                <div className="grid grid-flow-row grid-cols-2 auto-rows-max">
                    <div className="p-4">

                    
                    <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                    <p className="text-gray-600 mb-1">
                        <span>{event.date}</span> | <span>{event.location}</span>
                    </p>
                    <p className="text-gray-700 line-clamp-3">{event.description}</p>
                    </div>

                    <div className='p-12'>
                        <Button className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
                            Register
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventCard;
