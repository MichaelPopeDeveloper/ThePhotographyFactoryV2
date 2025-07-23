import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Gallery ID is required' }, { status: 400 });
  }

  const db = new Database('./backend/db/main.db');

  try {
    const eventStmt = db.prepare('SELECT * FROM events WHERE shareable_link_id = ?');
    const event = eventStmt.get(id);

    if (!event) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
    }

    const photosStmt = db.prepare('SELECT * FROM photos WHERE event_id = ?');
    const photos = photosStmt.all(event.id);

    return NextResponse.json({ event, photos });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  } finally {
    db.close();
  }
} 