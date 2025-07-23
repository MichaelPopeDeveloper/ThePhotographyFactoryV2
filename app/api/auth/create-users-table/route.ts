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
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE
      );
    `;
    const result = {
      message: 'Users table created successfully',
    }
    await client.end();
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    await client.end();
    return NextResponse.json({ error }, { status: 500 });
  }
} 