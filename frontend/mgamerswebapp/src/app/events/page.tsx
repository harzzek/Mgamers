'use client';
import { useContext, useEffect, useState, useRef } from "react";
import EventCard from "./components/EventCard";
import { Event } from "./interfaces/event";
import { fetchEvents } from "@/stores/eventStore";
import { AuthContext } from '@/context/AuthContext';

const EventsPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getEvents = async () => {
            try {
                console.log('Fetching events...');
                const fetchedEvents = await fetchEvents();
                setEvents(fetchedEvents);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch events.');
            } finally {
                setLoading(false);
            }
        };
        getEvents();
    }, [user]);

    if (loading) {
        return <div className="container mx-auto px-4 py-8">Loading events...</div>;
    }

    if (error) {
        return <div className="container mx-auto px-4 py-8">{error}</div>;
    }

    const isAdmin = () => {
        if (user && user.roles) {
            return user.roles.find(role => role.includes('Admin'));
        }
        return false;
    };

    console.log('isAdmin: ', isAdmin());

    return (
        <div className="container mx-auto px-4 py-8 bg-slate-700">
            <div className="grid grid-flow-row grid-cols-3 ">
                <div className="p-4 col-span-2">
                    <h1 className="text-4xl font-bold mb-8 text-center">Upcoming Events</h1>
                </div>
                <div className="p-4 text-center col-span-1">
                    {isAdmin() && (
                        <a href="/events/newEvent" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Event</a>
                    )}
                </div>
                <p className="text-lg text-center">Check out the upcoming events hosted by our community.</p>
            </div>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <a href={`events/${event.id}`} key={event.id}>
                        <EventCard event={event} />
                    </a>
                ))}
            </div>
        </div>
    );
}

export default EventsPage;