'use client';

import { useEffect, useState } from "react";
import { NewsPost } from "./interfaces/newsPost";
import { fetchAllNews } from "@/stores/newsPostStore";
import NewsCard from "./components/NewsCard";
import { useAuth } from "@/context/AuthContext";
import { Link } from "@heroui/link";

const NewsPage: React.FC = () => {
    const [news, setNews] = useState<NewsPost[] | null>(null);
    const { user } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const fetchedNews = await fetchAllNews();
                setNews(fetchedNews);
            } catch (err) {
                console.log(err);
                setError("Error");
            } finally {
                setLoading(false);
            }
        };
        getInfo();
    }, []);

    const isAdmin = () => {
        if (user && user.userRoles) {
            return user.userRoles.find(role => role.includes('Admin'));
        }
        return false;
    };

    if (loading) {
        return <div className="container mx-auto px-4 py-8">Finder nyhederne frem</div>;
    }

    return (
        <div className="container mx-auto px-4 py-16 relative">
            {isAdmin() &&
                <Link href="/news/createNews" className="absolute top-8 right-4 bg-primary-400 hover:bg-primary-200 px-4 py-2 rounded shadow-lg transition text-foreground-50">
                    + Nyhed
                </Link>
            }
            <div className="">
                <h1>Nyheder</h1>
                {error && 
                    <p>Where the news?</p>
                }
                {news && news.map((post) => (
                    <NewsCard key={post.id} {...post} />
                ))}

            </div>
        </div>
    );
}


export default NewsPage;