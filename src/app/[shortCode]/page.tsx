import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import { redirect } from 'next/navigation';
import RedirectComponent from '../components/sections/redirect/RedirectComponent';

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

export default async function UrlPage({ params }: UrlPageProps) {
    const { shortCode } = params;

    const validShortCodes = /^[a-z0-9]{5}$/;

    if (!validShortCodes.test(shortCode)) {
        redirect('/404');
    }

    const db = await openDb();
    console.log('Accessing URL for shortCode:', shortCode);

    const result = await db.get('SELECT url FROM url_mapping WHERE shortCode = ?', [shortCode]);

    if (!result) {
        console.log('URL not found for shortCode:', shortCode);
        redirect('/404');
    }

    const url = result.url;

    return (
        <RedirectComponent url={url} />
    );
}
