import { sql } from '@vercel/postgres';
import { put } from '@vercel/blob';
import { NextResponse, NextRequest } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const clientName = formData.get('clientName') as string;
    const clientEmail = formData.get('clientEmail') as string;
    const eventDate = formData.get('eventDate') as string;
    const eventType = formData.get('eventType') as string;
    const notes = formData.get('notes') as string;
    const photos = formData.getAll('photos') as File[];

    if (!clientName || photos.length === 0) {
      return NextResponse.json({ message: 'Client name and photos are required' }, { status: 400 });
    }

    const shareable_link_id = crypto.randomBytes(16).toString('hex');
    
    // Insert event data and get the new event's ID
    const eventResult = await sql`
      INSERT INTO events (client_name, client_email, event_date, event_type, notes, shareable_link_id) 
      VALUES (${clientName}, ${clientEmail}, ${eventDate}, ${eventType}, ${notes}, ${shareable_link_id})
      RETURNING id;
    `;
    const eventId = eventResult.rows[0].id;

    // Upload photos and save their paths
    for (const photo of photos) {
      if (photo.size > 0) {
        const blob = await put(photo.name, photo, { access: 'public' });
        await sql`
          INSERT INTO photos (event_id, file_path) 
          VALUES (${eventId}, ${blob.url});
        `;
      }
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

export async function GET() {
  try {
    const { rows: events } = await sql`SELECT * FROM events ORDER BY event_date DESC`;
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Failed to fetch events' }, { status: 500 });
  }
} 