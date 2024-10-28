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
                className="bg-gray-300 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                onClick={() => setIsOpen(true)}
            >
                <div className="grid grid-flow-row grid-cols-2 auto-rows-max">
                    <div className="p-4">

                    
                    <h2 className="text-xl text-gray-800 font-semibold mb-2">{event.name}</h2>
                    <p className="text-gray-600 mb-1">
                        <span>{event.startDate}</span> | <span>{event.endDate}</span>
                    </p>
                    <p className="text-gray-700 line-clamp-3">{event.location}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventCard;