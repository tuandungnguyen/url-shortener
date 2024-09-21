const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cron = require('node-cron');

const dbPath = path.resolve(__dirname, 'url_shortener.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS url_mapping (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            shortCode TEXT NOT NULL UNIQUE,
            shortUrl TEXT NOT NULL,
            url TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Table created or already exists.');
        }
    });
});

cron.schedule('0 0 * * *', () => {
    const query = `
        DELETE FROM url_mapping
        WHERE createdAt <= datetime('now', '-7 days')
    `;

    db.run(query, function (err) {
        if (err) {
            console.error('Error deleting old URLs:', err.message);
        } else {
            console.log(`Deleted ${this.changes} old URLs.`);
        }
    });
});

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(0);
    });
});
