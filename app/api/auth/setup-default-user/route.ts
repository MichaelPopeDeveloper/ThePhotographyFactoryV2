import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const username = 'admin';
    const password = 'password'; // You should change this
    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO users (username, password)
      VALUES (${username}, ${hashedPassword})
      ON CONFLICT (username) DO NOTHING;
    `;
    
    return NextResponse.json({ message: 'Default user created or already exists.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
} 