import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // THIS IS INSECURE AND FOR DEVELOPMENT ONLY
  // BYPASSES SSL CERTIFICATE VALIDATION
  const client = createClient({
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  try {
    const { rows: photos } = await client.sql`
      SELECT * FROM photos WHERE event_id = (
        SELECT id FROM events WHERE shareable_link_id = ${params.id}
      )
    `;
    await client.end();
    return NextResponse.json(photos);
  } catch (error) {
    await client.end();
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ message: 'Failed to fetch gallery' }, { status: 500 });
  }
} 