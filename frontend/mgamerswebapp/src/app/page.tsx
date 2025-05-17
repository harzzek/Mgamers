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
      try {
        const fetchedEvent = await fetchNextEvent();
        setCommingEvent(fetchedEvent);
      } catch (err) {
        console.log(err);
        setError("Error fetching coming event");
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Messages for users */}
          <div>
            <div className="bg-secondary-100 p-6 shadow-md mb-3">
              <h1 className="text-2xl font-semibold mb-4">Velkommen til MGamers Esport
                Dit Gamerfællesskab!
              </h1>
              <p>
                Hos MGamers Esport byder vi velkommen
                til et unikt og inkluderende fællesskab
                for gamere i alle aldre! Uanset om du er passioneret omkring esport,
                elsker brætspil eller bare vil hygge dig i godt selskab, så har vi noget for dig.
                Vi har været en del af den danske gamingverden i mere end 15 år,
                og vi er stolte af at være en af Danmarks ældste og mest etablerede gamingforeninger.
              </p>
            </div>
            <div className="bg-secondary-100 p-6 shadow-md">
              <h1 className="text-2xl font-semibold mb-4">
                Hvad gør os unikke?
              </h1>

              <ul className="space-y-6">
                <li>
                  <h3 className="text-xl font-semibold mb-2">Gaming på alle niveauer</h3>
                  <p>Vi tilbyder alt fra afslappede gaming-sessions til konkurrencer og esport-events, hvor du kan udfordre dig selv og andre.</p>
                </li>
                <li>
                  <h3 className="text-xl font-semibold mb-2">LAN-events</h3>
                  <p>Deltag i vores legendariske LAN-events, hvor vi skaber rammerne for 46 timers sjov, gaming og fællesskab. Alt er klar til dig – borde, strøm, internetkabler og en lynhurtig 1 Gbit forbindelse.</p>
                </li>
                <li>
                  <h3 className="text-xl font-semibold mb-2">Fællesskab og hygge</h3>
                  <p>MGamers Esport er ikke kun om gaming – vi spiller også brætspil, hygger os og møder ligesindede med samme passion.</p>
                </li>
                <li>
                  <h3 className="text-xl font-semibold mb-2">For børn, unge og voksne</h3>
                  <p>Vi er åbne for alle fra 12 år og opefter, og vi har fokus på et trygt og inkluderende miljø for alle medlemmer.</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Right column - Event Card */}
          <div>
            <div className="bg-secondary-100 p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Kommende Arrangement</h2>
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
    </div>
  );
}

export default Home;
