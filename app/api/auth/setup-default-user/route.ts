import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET(request: Request) {
  try {
    const username = 'admin@gmail.com';
    const email = 'admin@gmail.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const existingUsers = await sql`
      SELECT * FROM users WHERE username = ${username} OR email = ${email};
    `;

    if (existingUsers.length > 0) {
      return NextResponse.json({ message: 'Default user already exists' }, { status: 200 });
    }

    // If the user doesn't exist, create it
    await sql`
      INSERT INTO users (username, password, email)
      VALUES (${username}, ${hashedPassword}, ${email});
    `;

    return NextResponse.json({ message: 'Default user created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error setting up default user:', error);
    return NextResponse.json({ error: 'Failed to set up default user' }, { status: 500 });
  }
} 