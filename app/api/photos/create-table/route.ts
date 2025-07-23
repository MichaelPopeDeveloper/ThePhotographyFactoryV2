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
    await sql`
      CREATE TABLE IF NOT EXISTS photos (
        id SERIAL PRIMARY KEY,
        event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
        file_path VARCHAR(255) NOT NULL,
        uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return NextResponse.json({ message: 'Photos table created successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error creating photos table:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
} 