'use client';
import { useEffect, useState } from "react";
import { Event } from "./events/interfaces/event";
import { fetchNextEvent } from "@/stores/eventStore";
import EventCard from "./events/components/EventCard";
import { fetchLatestNews } from "@/stores/newsPostStore";
import { NewsPost } from "./news/interfaces/newsPost";
import NewsCard from "./news/components/NewsCard";

const Home: React.FC = () => {

  const [commingEvent, setCommingEvent] = useState<Event | null>(null);
  const [latestNews, setLatestNews] = useState<NewsPost[] | null>(null);
  const [evetError, setEventError] = useState<string | null>(null);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const getEvent = async () => {
      try {
        const fetchedEvent = await fetchNextEvent();
        setCommingEvent(fetchedEvent);
      } catch (err) {
        console.log(err);
        setEventError("Error fetching Events");
      }
    };

    const getNews = async () => {
      try {
        const fetchedNews = await fetchLatestNews();
        setLatestNews(fetchedNews);
      } catch (err) {
        console.log(err);
        setNewsError("Error fetching News");
      }
    };

    getEvent();
    getNews();
    setLoading(false);

  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-3 gap-6">
          {/* Left column - Messages for users */}
          <div className="col-span-2">
            <div className="bg-primary-100 p-6 shadow-md mb-3">
              <h1>Nyheder</h1>
              {newsError ?
                <p className="text-warning-500">{newsError}</p>
                : <>
                  {latestNews && latestNews.map((post) => (
                    <NewsCard key={post.id} {...post} />
                  ))}
                </>
              }

            </div>

          </div>

          {/* Right column - Event Card */}
          <div className="col-span-1">
            <div className="bg-primary-100 p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Kommende Arrangement</h2>
              {loading ? (
                <p className="text-default-500">Loading upcoming event...</p>
              ) : evetError ? (
                <p className="text-warning-500">{evetError}</p>
              ) : commingEvent ? (
                <EventCard event={commingEvent} />
              ) : (
                <p className="text-default-500">No upcoming events</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
