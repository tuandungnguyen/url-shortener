"use client";
import { useState } from 'react';
import URLShortenerHomeInput from './URLShortenerHomeInput';
import URLShortenerHomeOutpust from './URLShortenerHomeOutpust';

function URLShortenerHomeSections() {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [shortCode, setShortCode] = useState('');
    const [isExist, setIsExist] = useState(false);

    const handleShorten = async () => {
        const res = await fetch('/api/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const data = await res.json();
        if (data.shortUrl) {
            setShortUrl(data.shortUrl);
            setShortCode(data.shortCode);
            setIsExist(data.isExist);
        } else {
            console.error(data.error);
        }
    };

    return (
        <section>
            {shortUrl ? (
                <URLShortenerHomeOutpust shortCode={shortCode} shortUrl={shortUrl} url={url} isExist={isExist} />
            ) : (<URLShortenerHomeInput setUrl={setUrl} handleShorten={handleShorten} url={url} />)}
        </section>
    );
}

export default URLShortenerHomeSections;
