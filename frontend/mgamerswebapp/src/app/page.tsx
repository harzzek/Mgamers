'use client';
import { useEffect, useState } from "react";
import { Event } from "./events/interfaces/event";
import { fetchNextEvent } from "@/stores/eventStore";
import EventCard from "./events/components/EventCard";

const Home: React.FC = () => {

  const [commingEvent, setCommingEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getEvent = async () => {
      try{
        const fetchedEvent = await fetchNextEvent();
        setCommingEvent(fetchedEvent);
      } catch (err) {
        setError("Error fetching coming event");
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  },[]);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column - Messages for users */}
        <div className="bg-stone-600 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Our Event Platform</h2>
          <p className="text-white">Stay updated with the latest events happening soon. Check out the upcoming event on the right!</p>
        </div>

        {/* Right column - Event Card */}
        <div className="bg-stone-600 p-6 rounded-xl shadow-md">
          {loading ? (
            <p className="text-gray-500">Loading upcoming event...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : commingEvent ? (
            <EventCard event={commingEvent} />
          ) : (
            <p className="text-gray-500">No upcoming events</p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Home;
