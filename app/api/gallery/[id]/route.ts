import postgres from 'postgres';
import { NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const eventResult = await sql`
      SELECT client_name, event_date FROM events WHERE shareable_link_id = ${params.id}
    `;
    const event = eventResult[0];

    const photos = await sql`
      SELECT * FROM photos WHERE event_id = (
        SELECT id FROM events WHERE shareable_link_id = ${params.id}
      )
    `;
    return NextResponse.json({ event, photos });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ message: 'Failed to fetch gallery' }, { status: 500 });
  }
} 