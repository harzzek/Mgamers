// components/EventCard.tsx
'use client';
import React from 'react';
import { Event } from '../interfaces/event';
import { Card, CardBody, CardFooter, CardHeader, Divider } from '@heroui/react';

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {

    return (
        <>
            <a className='flex items-center space-x-4 group hover:transition-shadow transition-transform duration-300 hover:-translate-y-1 overflow-hidden
            bg-primary-100 rounded-xl shadow-md hover:shadow-secondary' href={`events/${event.id}`} >
                <div className='flex-shrink-0 text-center bg-primary-500 rounded-lg p-2 w-16'>
                    <p className='text-white font-bold text-xl'>
                        {event.startDate.getDate().toString()}
                    </p>
                    <p className='text-red-500 text-xs font-semibold uppercase'>
                        {event.startDate.toLocaleString('default', { month: 'short' })}
                    </p>
                </div>

                <div>
                    <h4>
                        {event.name}
                    </h4>
                    <p className='text-sm text-gray-400'>
                        {event.location}
                    </p>
                </div>
                

            </a>
        </>
    );
};

export default EventCard;
