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
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error('Error creating users table:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
} 