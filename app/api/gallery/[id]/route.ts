import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Gallery ID is required' }, { status: 400 });
  }

  try {
    const eventResult = await sql`SELECT * FROM events WHERE shareable_link_id = ${id}`;
    const event = eventResult.rows[0];

    if (!event) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
    }

    const photosResult = await sql`SELECT * FROM photos WHERE event_id = ${event.id}`;
    const photos = photosResult.rows;

    return NextResponse.json({ event, photos });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
} 