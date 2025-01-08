'use client';
import { useEffect, useState, useContext } from 'react';
import { fetchEventById, registerForEvent, unregisterFromEvent } from '@/stores/eventStore';
import { Event, registration, Table as EventTable } from '../interfaces/event';
import { AuthContext } from '@/context/AuthContext';
import { TableSvg } from './components/TableSvg';
import {
    TABLE_WIDTH,
    TABLE_HEIGHT,
    HORIZONTAL_SPACING,
    VERTICAL_SPACING,
} from './constants/layout';

interface EventDetailsProps {
    params: {
        id: number;
    };
}

export default function EventDetails({ params }: EventDetailsProps) {
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user: authUser } = useContext(AuthContext);
    const [seatIds, setSeatIds] = useState<number[]>([]);

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

            fetchedEvent.participants.forEach((participant: registration) => {
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
    return (
        <div className='container mx-auto px-4 py-8'>
            {error &&
                <div id="toast-top-right" className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-30 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
                    <div className='ms-3 text-sm font-normal'>
                        {error}
                    </div>
                </div>
            }
            <h1>Event Details</h1>
            <div className='grid grid-flow-row grid-cols-2 auto-rows-max'>
                <div>
                    <h2>{event?.name}</h2>
                    <p>{event?.startDate}</p>
                    <p>{event?.location}</p>
                    <p>{event?.description}</p>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    preserveAspectRatio='xMidYMid meet'
                >
                    {event?.tables.map((table, index) => {
                        const x = calculateTablePositionX(index);
                        const y = calculateTablePositionY(index);
                        return (
                            <TableSvg key={table.id} table={table} x={x} y={y} width={TABLE_WIDTH} height={TABLE_HEIGHT} tableindex={index} onSeatClick={onSeatClick} eventid={event.id} fetchEvent={fetchEvent} />
                        )
                    })}
                </svg>

                {isRegistered() ?
                    <button
                        type="submit"
                        onClick={handleRegister}
                        className="disabled:bg-gray-800 disabled:text-gray-500 mt-4 bg-indigo-600 text-white font-semibold p-2 rounded-md hover:bg-indigo-700">
                        Register
                    </button>
                    :
                    <button
                        type="submit"
                        onClick={handleUnregister}
                        className="disabled:bg-gray-800 disabled:text-gray-500 mt-4 bg-red-500 text-white font-semibold p-2 rounded-md hover:bg-red-300">
                        Unregister
                    </button>
                }
            </div>

        </div>
    );
}