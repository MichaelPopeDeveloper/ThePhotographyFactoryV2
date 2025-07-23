import { DB } from "https://deno.land/x/sqlite/mod.ts";

try {
  const db = new DB("./backend/db/main.db");

  // Users Table
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at DATETIME NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Events Table
  await db.query(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_name TEXT NOT NULL,
      client_email TEXT,
      event_date DATETIME,
      event_type TEXT,
      notes TEXT,
      shareable_link_id TEXT NOT NULL UNIQUE,
      created_at DATETIME NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Photos Table
  await db.query(`
    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER NOT NULL,
      file_path TEXT NOT NULL,
      uploaded_at DATETIME NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (event_id) REFERENCES events (id)
    )
  `);

  console.log("Database initialized successfully.");
  db.close();
} catch (err) {
  console.error("Error initializing database:", err);
} 