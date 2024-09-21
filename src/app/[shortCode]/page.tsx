// import { open } from 'sqlite';
// import sqlite3 from 'sqlite3';
// import path from 'path';
// import { redirect } from 'next/navigation';

// type UrlPageProps = {
//     params: {
//         shortCode: string;
//     };
// };

// async function openDb() {
//     const dbPath = path.resolve('./url_shortener.db');
//     return open({
//         filename: dbPath,
//         driver: sqlite3.Database,
//     });
// }

// export default async function UrlPage({ params }: UrlPageProps) {
//     const { shortCode } = params;

//     const validShortCodes = /^[a-z0-9]{5}$/;

//     if (!validShortCodes.test(shortCode)) {
//         return redirect('/404');
//     }

//     const db = await openDb();

//     console.log('Accessing URL for shortCode:', shortCode);

//     const result = await db.get('SELECT url FROM url_mapping WHERE shortCode = ?', [shortCode]);

//     if (!result) {
//         console.log('URL not found for shortCode:', shortCode);
//         redirect('/404');
//     } else {
//         redirect(result.url);
//     }
// }

"use client"
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

type UrlPageProps = {
    params: {
        shortCode: string;
    };
};

async function openDb() {
    const dbPath = path.resolve('./url_shortener.db');
    return open({
        filename: dbPath,
        driver: sqlite3.Database,
    });
}

export default function UrlPage({ params }: UrlPageProps) {
    const { shortCode } = params;

    const validShortCodes = /^[a-z0-9]{5}$/;

    if (!validShortCodes.test(shortCode)) {
        redirect('/404');
    }

    const [url, setUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUrl = async () => {
            const db = await openDb();
            console.log('Accessing URL for shortCode:', shortCode);

            const result = await db.get('SELECT url FROM url_mapping WHERE shortCode = ?', [shortCode]);

            if (!result) {
                console.log('URL not found for shortCode:', shortCode);
                redirect('/404');
            } else {
                setUrl(result.url);
            }
            setLoading(false);
        };

        fetchUrl();
    }, [shortCode]);

    const handleRedirect = () => {
        if (url) {
            window.location.href = url;
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (url) {
                window.location.href = url;
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [url]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Redirecting...</h1>
            < p > Bạn sẽ được chuyển đến: {url} </p>
            < p > Nhấn vào nút bên dưới để di chuyển ngay: </p>
            < button onClick={handleRedirect} > Di chuyển </button>
        </div>
    );
}
