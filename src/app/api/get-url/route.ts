import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { NextResponse } from 'next/server';
import path from 'path';

async function openDb() {
    const dbPath = path.resolve('./url_shortener.db');
    return open({
        filename: dbPath,
        driver: sqlite3.Database,
    });
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const shortCode = searchParams.get('shortCode');

    if (!shortCode) {
        return NextResponse.json({ error: 'shortCode is required' }, { status: 400 });
    }

    try {
        const db = await openDb();
        const result = await db.get('SELECT url FROM url_mapping WHERE shortCode = ?', [shortCode]);
        await db.close();


        if (result) {
            return NextResponse.json({ url: result.url });
        } else {
            return NextResponse.json({ error: 'URL not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error in GET /api/get-url:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
