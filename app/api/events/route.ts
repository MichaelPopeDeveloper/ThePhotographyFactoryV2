import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  // THIS IS INSECURE AND FOR DEVELOPMENT ONLY
  // BYPASSES SSL CERTIFICATE VALIDATION
  const client = createClient({
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  try {
    const { rows } = await client.sql`SELECT * FROM events ORDER BY event_date DESC`;
    await client.end();
    return NextResponse.json(rows);
  } catch (error) {
    await client.end();
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // THIS IS INSECURE AND FOR DEVELOPMENT ONLY
  // BYPASSES SSL CERTIFICATE VALIDATION
  const client = createClient({
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  try {
    const { name, date, location, description } = await request.json();
    await client.sql`
      INSERT INTO events (name, event_date, location, description)
      VALUES (${name}, ${date}, ${location}, ${description})
    `;
    await client.end();
    return NextResponse.json({ message: 'Event created successfully' }, { status: 201 });
  } catch (error) {
    await client.end();
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
} 