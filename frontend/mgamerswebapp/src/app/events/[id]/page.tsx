'use client';
import { useEffect, useState, useContext, use } from 'react';
import { fetchEventById, registerForEvent } from '@/stores/eventStore';
import { Event, registration, Table as EventTable } from '../interfaces/event';
import { AuthContext } from '@/context/AuthContext';
import { TableSvg } from './components/TableSvg';
import {
    TABLE_WIDTH,
    TABLE_HEIGHT,
    HORIZONTAL_SPACING,
    VERTICAL_SPACING,
} from './constants/layout';
import { get } from 'http';

interface EventDetailsProps {
    params: {
        id: number;
    };
}

export default function EventDetails({ params }: EventDetailsProps) {
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user: authUser, userToken } = useContext(AuthContext);
    const [registered, setRegistered] = useState<boolean>(false);
    const [seatIds, setSeatIds] = useState<number[]>([]);

    const totalRows = event && event.tables ? Math.ceil(event.tables.length / 2) : 0;

    const svgWidth = 4 * TABLE_WIDTH + 3 * HORIZONTAL_SPACING;
    const svgHeight = totalRows * TABLE_HEIGHT + (totalRows - 1) * VERTICAL_SPACING;

    useEffect(() => {

        const getEvent = async () => {
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
        };
        getEvent();

    }, [params.id]);


    const handleRegister = async () => {
        try {
            setRegistered(true);
            if (authUser && event) {
                setEvent(event);
                const data = await registerForEvent(event.id, authUser.id, seatIds);
                console.log('Registered for event.', data);
            } else {
                console.error('User or event not found.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to register for event.');
        }
    }

    const onSeatClick = (seatId: number) => {

        if (seatIds.includes(seatId)) {
            seatIds.splice(seatIds.indexOf(seatId));
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

    const uniqueUsers = event?.participants.map((participant) => participant.user).filter((user, index, self) => self.findIndex(u => u.id === user.id) === index);


    if (loading) {
        return <div>Loading event...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className='container mx-auto px-4 py-8'>
            <h1>Event Details</h1>
            <div className='grid grid-flow-row grid-cols-2 auto-rows-max'>
                <div>
                    <h2>{event?.name}</h2>
                    <p>{event?.startDate}</p>
                    <p>{event?.location}</p>
                    <p>{event?.description}</p>
                </div>

                <div>
                    <h2>Registrations</h2>
                    <ul>
                        {uniqueUsers?.map((user) => {
                            return (
                                <li key={user.id}>{user.username}</li>
                            );
                        }
                        )}
                    </ul>
                    

                </div>
            </div>

            <div >
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    preserveAspectRatio='xMidYMid meet'
                >
                    {event?.tables.map((table, index) => {
                        const x = calculateTablePositionX(index);
                        const y = calculateTablePositionY(index);
                        return (
                            <TableSvg key={table.id} table={table} x={x} y={y} width={TABLE_WIDTH} height={TABLE_HEIGHT} tableindex={index} onSeatClick={onSeatClick} />
                        )
                    })}
                </svg>
            </div>

            <button
                type="submit"
                onClick={handleRegister}
                disabled={registered || !isRegistered()}
                className="disabled:bg-gray-800 disabled:text-gray-500 mt-4 w-full bg-indigo-600 text-white font-semibold p-2 rounded-md hover:bg-indigo-700">
                Register
            </button>


        </div>
    );
}