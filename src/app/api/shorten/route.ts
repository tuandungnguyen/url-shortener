import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Database } from 'sqlite3';
import path from 'path';

const dbPath = path.resolve('./url_shortener.db');

async function openDb() {
    return open({
        filename: dbPath,
        driver: sqlite3.Database as unknown as typeof Database,
    });
}

export async function POST(req: NextRequest) {
    const { url } = await req.json();

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        const db = await openDb();

        const existingUrl = await db.get('SELECT shortCode, shortUrl FROM url_mapping WHERE url = ?', [url]);

        if (existingUrl) {
            return NextResponse.json({
                shortCode: existingUrl.shortCode,
                shortUrl: existingUrl.shortUrl,
                isExist: true,
            });
        }

        const shortCode = Math.random().toString(36).substring(2, 7);
        const shortUrl = `http://localhost:3000/${shortCode}`;

        await db.run('INSERT INTO url_mapping (shortCode, shortUrl, url) VALUES (?, ?, ?)', [shortCode, shortUrl, url]);
        await db.close();

        return NextResponse.json({ shortCode, shortUrl });
    } catch {
        return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }
}
