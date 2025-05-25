'use client';

import React, { useState, useEffect } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { Button, PressEvent } from '@heroui/button';
import ConfirmModal from '@/app/components/modals/ConfirmModal';
import { createNewsPost } from '@/stores/newsPostStore';

const NewsPage: React.FC = () => {

    const [markdown, setMarkdown] = useState<string>('# Headings\n\n### This is markdown\n\n**Bold**\n\ntext\n\n_What ever this is called_');
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    

    // Convert markdown to HTML
    const convertMarkdown = async (md: string) => {
        try {
            const result = await unified()
                .use(remarkParse)
                .use(remarkRehype, { allowDangerousHtml: true })  // Allow raw HTML // Process raw HTML
                .use(rehypeStringify)
                .process(md);
            setHtmlContent(result.toString());
        } catch (err) {
            console.error('Markdown processing error:', err);
        }
    };

    // Initial load
    useEffect(() => {
        convertMarkdown(markdown);
    }, [markdown]);


    const handleSubmit = (e: PressEvent) => {
        console.log(e);
        setConfirmOpen(true);
    }

    const createNews = async () => {
        try{
            await createNewsPost(markdown);
            setConfirmOpen(false);
        } catch (error){
            console.log(error);
            setErrorMessage("Fejl skete, højst sandsynlig server fejl. Kontakt HC");
        }
        
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <h1>Nyheder toolkit</h1>
            {errorMessage &&
                <p className='text-danger-500'>{errorMessage}</p>
            }
            
            <textarea
                className="w-full p-2 border rounded-md mb-4"
                rows={10}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
            />
            <div className="bg-secondary-200 p-6 shadow-md mb-3 border">
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>

            <div className='flex justify-end pt-5'>
                <Button color='primary' onPress={(e) => handleSubmit(e)} className='transition bg-primary-400 hover:bg-primary-200'>
                    Create
                </Button>
            </div>

            <ConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} title='Er du sikker?' message='Når du først har lavet en nyhed, så kan ALLE se den.' onConfirm={() => createNews()}/>
        </div>
    );
}


export default NewsPage;