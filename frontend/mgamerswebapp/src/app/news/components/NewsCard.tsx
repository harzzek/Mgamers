"use client";

import { Card, CardBody, CardFooter, Divider } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import { NewsPost } from "../interfaces/newsPost"
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export default function NewsCard(newspost: NewsPost) {
    const [htmlContent, setHtmlContent] = useState<string>('');

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

    return (
        <Card className='bg-secondary-200 p-6 shadow-md mb-3'>
            <CardBody>
                <div className="prose max-w-none prose-invert" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </CardBody>
            <Divider/>
            <CardFooter>
                <div className='flex justify-end w-full'>
                    <div>
                        <p>{newspost.createdAt.toLocaleDateString()}</p>
                    </div>
                </div>
                
            </CardFooter>
        </Card>
    );
}