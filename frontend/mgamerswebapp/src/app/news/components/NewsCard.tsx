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

export default function NewsCard(newspost: NewsPost) {
    const [htmlContent, setHtmlContent] = useState<string>('');
    const { user } = useAuth();
    const [confirmOpen, setConfirmOpen] = useState(false);

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
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Card className='bg-primary-200 text-foreground-200 p-6 shadow-md mb-3'>
                <CardBody>
                    <div className="prose max-w-none prose-invert" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </CardBody>
                <Divider />
                <CardFooter>
                    {isAdmin() &&
                        <Button color="danger" onPress={(e) => deletePostPress(e)}>
                            Delete
                        </Button>
                    }
                    <div className='flex justify-end w-full'>
                        <div>
                            <p>{newspost.createdAt.toLocaleDateString()}</p>
                        </div>
                    </div>
                </CardFooter>
            </Card>
            <ConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} title='Er du sikker?' message='Du er igang med at slette en nyhed' onConfirm={() => deletePost()}/>
        </>
    );
}