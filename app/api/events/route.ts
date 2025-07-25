import postgres from 'postgres';
import { NextResponse, NextRequest } from 'next/server';
import { put } from '@vercel/blob';
import crypto from 'crypto';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET() {
  try {
    const rows = await sql`SELECT * FROM events ORDER BY event_date DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { clientName, clientEmail, eventDate, eventType, notes, photoUrls } = await request.json();

    if (!clientName || !photoUrls || photoUrls.length === 0) {
      return NextResponse.json({ message: 'Client name and photos are required' }, { status: 400 });
    }

    const shareable_link_id = crypto.randomBytes(16).toString('hex');
    
    // Insert event data and get the new event's ID
    const eventResult = await sql`
      INSERT INTO events (client_name, client_email, event_date, event_type, notes, shareable_link_id) 
      VALUES (${clientName}, ${clientEmail}, ${eventDate}, ${eventType}, ${notes}, ${shareable_link_id})
      RETURNING id;
    `;
    const eventId = eventResult[0].id;

    // Save photo URLs
    for (const url of photoUrls) {
      await sql`
        INSERT INTO photos (event_id, file_path) 
        VALUES (${eventId}, ${url});
      `;
    }

    return NextResponse.json({
      message: 'Event created successfully',
      event: { id: eventId, shareable_link_id }
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ message: 'Failed to create event' }, { status: 500 });
  }
} 