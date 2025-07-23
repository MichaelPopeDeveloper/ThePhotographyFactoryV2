import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // THIS IS INSECURE AND FOR DEVELOPMENT ONLY
  // BYPASSES SSL CERTIFICATE VALIDATION
  const client = createClient({
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        event_id INTEGER REFERENCES events(id),
        note TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await client.end();
    return NextResponse.json({ message: 'Notes table created successfully' }, { status: 200 });
  } catch (error) {
    await client.end();
    return NextResponse.json({ error }, { status: 500 });
  }
} 