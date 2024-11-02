'use client';
import { useEffect, useState, useContext } from 'react';
import { fetchEventById, registerForEvent } from '@/stores/eventStore';
import { Event } from '../interfaces/event';
import { AuthContext } from '@/context/AuthContext';
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
    const { user, userToken } = useContext(AuthContext);
    const [registered, setRegistered] = useState<boolean>(false);

    useEffect(() => {

        const getEvent = async () => {
            try {
                console.log('Fetching event...');
                const fetchedEvent = await fetchEventById(params.id);
                setEvent(fetchedEvent);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch event.');
            } finally {
                setLoading(false);
            }
        }; 
        getEvent();

    }, []);

    const handleRegister = async () => {
        setRegistered(true);
        if (user && event){

            event.participants.push(user);
            setEvent(event);
            const data = await registerForEvent(event.id, user.id);
            console.log('Registered for event.', data);
        } else {
            console.error('User or event not found.');
        }
    }

    const isRegistered = (): boolean => {
        if (user && event) {
            return event.participants.find(participant => participant.id === user.id) ? false : true;
        }
        return false;
    }
    

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
                        {event?.participants.map((user) => (
                            <li key={user.id}>{user.username}</li>
                        ))}
                    </ul>
                    <button
                        type="submit"
                        onClick={handleRegister}
                        disabled={registered || !isRegistered()}
                        className="disabled:bg-gray-800 disabled:text-gray-500 mt-4 w-full bg-indigo-600 text-white font-semibold p-2 rounded-md hover:bg-indigo-700">
                        Register
                    </button>

                </div>
            </div>

            <div>
                <svg width={500} height={500}>
                    
                </svg>
            </div>


        </div>
    );
}