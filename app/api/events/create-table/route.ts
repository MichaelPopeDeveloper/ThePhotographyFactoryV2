import postgres from 'postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET(request: Request) {
  try {
    // Drop the table if it exists to ensure a clean slate
    await sql`DROP TABLE IF EXISTS events;`;
    
    await sql`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        client_name VARCHAR(255) NOT NULL,
        client_email VARCHAR(255),
        event_date DATE,
        event_type VARCHAR(255),
        notes TEXT,
        shareable_link_id VARCHAR(255) UNIQUE NOT NULL
      );
    `;
    return NextResponse.json({ message: 'Events table created successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error creating events table:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
} 