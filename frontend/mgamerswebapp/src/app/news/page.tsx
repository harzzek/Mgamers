'use client';

import React, { useState, useEffect } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const NewsPage: React.FC = () => {

    const [markdown, setMarkdown] = useState<string>('### This is markdown\n\nDoesnt\nquite\nwork');
    const [htmlContent, setHtmlContent] = useState<string>('');

    const doc = `
    # Pluto

    Pluto is a dwarf planet in the Kuiper belt.

    ## Contents

    ## History

    ### Discovery

    In the 1840s, Urbain Le Verrier used Newtonian mechanics to predict the position of…

    ### Name and symbol

    The name Pluto is for the Roman god of the underworld, from a Greek epithet for Hades…

    ### Planet X disproved

    Once Pluto was found, its faintness and lack of a viewable disc cast doubt…

    ## Orbit

    Pluto's orbital period is about 248 years…
    `;

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

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-2xl font-bold mb-4">News Post Editor</h1>
            <textarea
                className="w-full p-2 border rounded-md mb-4"
                rows={10}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
            />
            <div className="mt-4 p-4 border rounded-md bg-secondary-300">
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
        </div>
    );
}


export default NewsPage;