"use client";

import { Button, Card, CardBody, CardFooter, Divider, PressEvent } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import { NewsPost } from "../interfaces/newsPost"
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { useAuth } from '@/context/AuthContext';
import { deleteNewsPost } from '@/stores/newsPostStore';
import ConfirmModal from '@/app/components/modals/ConfirmModal';
import { useRouter } from 'next/navigation';

export default function NewsCard(newspost: NewsPost) {
    const [htmlContent, setHtmlContent] = useState<string>('');
    const { user } = useAuth();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const router = useRouter();
    

    useEffect(() => {
        const convertMarkdown = async () => {
            try {
                const result = await unified()
                    .use(remarkParse)
                    .use(remarkRehype)
                    .use(rehypeStringify)
                    .process(newspost.letter || '');
                setHtmlContent(result.toString());
            } catch (error) {
                console.error('Markdown conversion error:', error);
            }
        };

        convertMarkdown();
    }, [newspost.letter]);

    const isAdmin = () => {
        if (user && user.userRoles) {
            return user.userRoles.find(role => role.includes('Admin'));
        }
        return false;
    };

    const deletePostPress = (e: PressEvent) => {
        console.log(e);
        
        setConfirmOpen(true);
    };

    const deletePost = async () => {
        try {
            await deleteNewsPost(newspost.id);
            router.push('/')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <article className='bg-primary-200 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1'>
                <div className="p-6 md:p-8">
                    <div className="prose max-w-none prose-invert" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>
                
                <div className="grid grid-cols-2 bg-primary-50 px-6 py-3 place-content-between ">
                    <div>
                        {isAdmin() &&
                            <Button color="danger" onPress={(e) => deletePostPress(e)}>
                                Delete
                            </Button>
                        }
                    </div>
                    
                    <div className='text-end'>
                        <span className='text-sm font-medium text-gray-400'>{newspost.createdAt.toLocaleDateString()}</span>
                    </div>
                </div>
            </article>
            <ConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} title='Er du sikker?' message='Du er igang med at slette en nyhed' onConfirm={() => deletePost()}/>
        </>
    );
}