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
        <a href={`events/${event.id}`} >
            <Card className='bg-primary-100 hover:opacity-75'>
                <CardHeader>
                    <div className='flex flex-col'>
                        <p className='text-md'>{event.name}</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p>
                        {event.description}
                    </p>
                </CardBody>
                <Divider />
                <CardFooter>
                    <div className='flex flex-col'>
                        <div>
                            <p>
                                <span>{event.startDate}</span> | <span>{event.endDate}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                {event.location}
                            </p>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </a>
    );
};

export default EventCard;
