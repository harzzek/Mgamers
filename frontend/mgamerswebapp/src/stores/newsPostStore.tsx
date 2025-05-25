import { NewsPost } from '@/app/news/interfaces/newsPost';
import axiosInstance from './axiosInstance';

const API_URL = '/News';

export const fetchAllNews = async (): Promise<NewsPost[]> => {
    const response = await axiosInstance.get(`${API_URL}`);
    return response.data.map((post: NewsPost) => ({
        ...post,
        createdAt: new Date(post.createdAt),
    })) as NewsPost[];
};

export const fetchLatestNews = async (): Promise<NewsPost[]> => {
    const response = await axiosInstance.get(`${API_URL}/Latest`);
    return response.data.map((post: NewsPost) => ({
        ...post,
        createdAt: new Date(post.createdAt),
    })) as NewsPost[];
};

export const createNewsPost = async (letter: string) => {
    const response = await axiosInstance.post(`${API_URL}`, { letter });
    return response.data;
};

export const deleteNewsPost = async (id: number) => {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data;
};

