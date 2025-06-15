'use client';
import { useEffect, useState } from 'react';
import { fetchEventById, registerForEvent, unregisterFromEvent } from '@/stores/eventStore';
import { Event, registration, Table as EventTable } from '../interfaces/event';
import { useAuth } from '@/context/AuthContext';
import { TableSvg } from './components/TableSvg';
import {
    TABLE_WIDTH,
    TABLE_HEIGHT,
    HORIZONTAL_SPACING,
    VERTICAL_SPACING,
} from './constants/layout';
import { EventInfo } from '@/DTOs/eventDTO';
import LargeEventCard from '../components/LargeEventCard';
import { Button } from '@heroui/react';
import Image from 'next/image'

interface EventDetailsProps {
    params: {
        id: number;
    };
}

export default function EventDetails({ params }: EventDetailsProps) {
    const [event, setEvent] = useState<EventInfo | null>(null);
    const [participantAmount, setParticipantAmount] = useState<number>(0);
    const [cardEvent, setCardEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user: authUser } = useAuth();
    const [seatIds, setSeatIds] = useState<number[]>([]);
    const [registrations, setRegistrations] = useState<registration[]>([]);

    const totalRows = event && event.tables ? Math.ceil(event.tables.length / 4) : 1;

    const svgWidth = 4 * TABLE_WIDTH + 3 * HORIZONTAL_SPACING;
    const svgHeight = totalRows * TABLE_HEIGHT + totalRows * VERTICAL_SPACING + VERTICAL_SPACING;

    useEffect(() => {
        fetchEvent();
    }, [params.id]);

    const fetchEvent = async () => {
        try {
            console.log('Fetching event...');
            const fetchedEvent = await fetchEventById(params.id);
            const uniqueRegistrations: Array<registration> = [];

            const fetchedCardEvent: Event = {
                id: fetchedEvent.id,
                name: fetchedEvent.name,
                description: fetchedEvent.description,
                startDate: fetchedEvent.startDate,
                endDate: fetchedEvent.endDate,
                location: fetchedEvent.location,
                participants: fetchedEvent.participants,
                tables: fetchedEvent.tables
            }

            fetchedEvent.participants.forEach((participant: registration) => {
                if (!uniqueRegistrations.some((reg) => reg.userId === participant.userId)) {
                    uniqueRegistrations.push(participant);
                    setParticipantAmount(participantAmount + 1);
                }
                const seatId = participant.seatId;
                fetchedEvent.tables.forEach((table: EventTable) => {
                    table.seats.forEach(seat => {
                        if (seat.id === seatId) {
                            seat.occupied = true;
                            seat.user = participant.user;
                        }
                    });
                });
            });
            setCardEvent(fetchedCardEvent);
            setRegistrations(uniqueRegistrations);
            setEvent(fetchedEvent);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch event.');
        } finally {
            setLoading(false);
        }
    }


    const handleRegister = async () => {
        if (seatIds.length === 0) {
            setError('No seats selected.');

        } else if (seatIds.length > 2) {
            setError('Only two seat can be selected.');

        } else {
            try {
                if (authUser && event) {
                    const data = await registerForEvent(event.id, authUser.id, seatIds);
                    console.log('Registered for event.', data);
                    fetchEvent();
                } else {
                    console.error('User or event not found.');
                }
            } catch (err) {

                console.error(err);
                setError('Failed to register for event.');
            }

        }

    }

    const handleUnregister = async () => {
        try {
            if (authUser && event) {
                const data = await unregisterFromEvent(event.id, authUser.id);
                console.log('Unregistered from event.', data);
                setParticipantAmount(participantAmount-1);
                fetchEvent();
            } else {
                console.error('User or event not found.');
            }


        } catch (err) {
            console.error(err);
            setError('Failed to unregister from event.');
        }

    }

    const onSeatClick = (seatId: number) => {

        if (seatIds.includes(seatId)) {
            seatIds.splice(seatIds.indexOf(seatId), 1);
        } else {
            seatIds.push(seatId);
        }
        setSeatIds(seatIds);
        console.log('SeatIds:', seatIds);
    }

    const isRegistered = (): boolean => {
        if (authUser && event) {
            return event.participants.find(participant => participant.userId === authUser.id) ? false : true;
        }
        return false;
    }

    const calculateTablePositionX = (index: number): number => {
        const columnNumber = index % 4;
        if (columnNumber === 0) {
            return HORIZONTAL_SPACING;
        } else if (columnNumber === 1) {
            return HORIZONTAL_SPACING + TABLE_WIDTH + 2;
        } else if (columnNumber === 2) {
            return 2 * TABLE_WIDTH + 2 * HORIZONTAL_SPACING + 2;
        } else {
            return 3 * TABLE_WIDTH + 2 * HORIZONTAL_SPACING + 4;
        }
    }

    const calculateTablePositionY = (index: number): number => {
        const rowNumber = Math.floor(index / 4);
        return rowNumber * (TABLE_HEIGHT + VERTICAL_SPACING);
    }

    if (loading) {
        return <div>Loading event...</div>;
    }

    if (!authUser || (!authUser.userRoles.includes("Admin") && !authUser.userRoles.includes("User") && !authUser.userRoles.includes("Guest"))) {
        return (
            <div className='text-center container mx-auto px-4 py-8'>
                <p className='text-danger-700'>
                    You need to either be logged in or be a confirmed user to get seating
                </p>
            </div>
        );

    }
    return (
        <div className='container mx-auto px-4 py-16'>
            {error &&
                <div id="toast-top-right" className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-30 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
                    <div className='ms-3 text-sm font-normal'>
                        {error}
                    </div>
                </div>
            }
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className="lg:col-span-1 space-y-8">
                    <LargeEventCard event={cardEvent!} buttonShow={false} />
                    <div className='bg-primary-100 rounded-xl p-6'>
                        <h2>Deltagere (<span>{participantAmount}</span>)</h2>
                        <div className="participant-list h-64 overflow-y-auto space-y-3 pr-2">
                            {registrations.map((reg) => (
                                <div className='flex items-center justify-between p-2 rounded-lg bg-primary-400' key={reg.eventId + reg.seatId}>
                                    <div className="flex items-center gap-3">
                                        <Image src={`https://placehold.co/32x32/1F2937/FFFFFF?text=${reg.user.username.charAt(0).toUpperCase()}`} className="w-8 h-8 rounded-full" alt="avatar"/>
                                        <span className="font-medium text-white">{reg.user.username}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-secondary-300">Plads #{reg.seatId}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                <div className="lg:col-span-2 bg-primary-100 rounded-xl p-6 grid grid-cols-1 content-between">
                    
                    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                        preserveAspectRatio='xMidYMid meet'
                    >
                        {event?.tables.map((table, index) => {
                            const x = calculateTablePositionX(index);
                            const y = calculateTablePositionY(index);
                            return (
                                <TableSvg 
                                    key={table.id} 
                                    table={table} 
                                    x={x} 
                                    y={y} 
                                    width={TABLE_WIDTH} 
                                    height={TABLE_HEIGHT} 
                                    tableindex={index} 
                                    onSeatClick={onSeatClick} 
                                    eventid={event.id} 
                                    fetchEvent={fetchEvent} />
                            )
                        })}
                    </svg>

                    <div className='text-right'>
                    {isRegistered() ?
                        <Button
                            type="submit"
                            color="success"
                            onPress={handleRegister}
                            variant='solid'
                        >
                            Register
                        </Button>
                        :
                        <Button
                            type="submit"
                            color='warning'
                            onPress={handleUnregister}
                            variant='ghost'
                        >
                            Unregister
                        </Button>
                    }
                    </div>
                    
                    
                </div>
            </div>



        </div>
    );
}