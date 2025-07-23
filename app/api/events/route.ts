import { NextResponse, NextRequest } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import crypto from 'crypto';
import { Buffer } from 'node:buffer';

const uploadDir = path.join(process.cwd(), 'public', 'images', 'content');

export async function POST(request: NextRequest) {
  try {
    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

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

    // Save files to the server
    const savedPhotoPaths: string[] = [];
    for (const photo of photos) {
      if(photo.size === 0) continue; // Skip empty files
      const buffer = Buffer.from(await photo.arrayBuffer());
      const filename = `${Date.now()}-${photo.name}`;
      const filepath = path.join(uploadDir, filename);
      await fs.writeFile(filepath, buffer);
      savedPhotoPaths.push(`/images/content/${filename}`);
    }

    if (savedPhotoPaths.length === 0) {
        return NextResponse.json({ message: 'Valid photos are required' }, { status: 400 });
    }

    // Save event and photo paths to the database
    const db = new Database('./backend/db/main.db');
    const shareable_link_id = crypto.randomBytes(16).toString('hex');

    const eventStmt = db.prepare(
      `INSERT INTO events (client_name, client_email, event_date, event_type, notes, shareable_link_id) 
       VALUES (?, ?, ?, ?, ?, ?)`
    );
    const result = eventStmt.run(clientName, clientEmail, eventDate, eventType, notes, shareable_link_id);
    const eventId = result.lastInsertRowid;

    const photoStmt = db.prepare('INSERT INTO photos (event_id, file_path) VALUES (?, ?)');
    for (const photoPath of savedPhotoPaths) {
      photoStmt.run(eventId, photoPath);
    }

    db.close();

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
    const db = new Database('./backend/db/main.db');
    const stmt = db.prepare('SELECT * FROM events ORDER BY event_date DESC');
    const events = stmt.all();
    db.close();

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Failed to fetch events' }, { status: 500 });
  }
} 