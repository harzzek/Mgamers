'use client';
import { useEffect, useState } from "react";
import { Event } from "./events/interfaces/event";
import { fetchUpcomingEvents } from "@/stores/eventStore";
import EventCard from "./events/components/EventCard";
import { fetchLatestNews } from "@/stores/newsPostStore";
import { NewsPost } from "./news/interfaces/newsPost";
import NewsCard from "./news/components/NewsCard";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";

const Home: React.FC = () => {

  const [commingEvents, setCommingEvent] = useState<Event[] | null>(null);
  const [latestNews, setLatestNews] = useState<NewsPost[] | null>(null);
  const [newsError, setNewsError] = useState<string | null>(null);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const fetchedEvent = await fetchUpcomingEvents(5);
        setCommingEvent(fetchedEvent);
      } catch (err) {
        console.log(err);
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

  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-3 gap-6">
          {/* Left column - Messages for users */}
          <div className="col-span-2 space-y-8">
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

          {/* Right column - Event Card */}
          <div className="col-span-1">
            <div className="bg-primary-200 rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-4">Kommende Arrangement</h2>
              <Divider className="mb-5"/>
              <div className="space-y-5">
                {commingEvents && commingEvents.map((commingevent) => (
                  <EventCard event={commingevent} key={commingevent.id + commingevent.name} />
                ))}

              </div>

              <a href="/events">
                <Button color="secondary" className="mt-8" variant="ghost">
                  Se alle arrangementer
                </Button>
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
