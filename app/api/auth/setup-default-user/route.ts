import { createClient } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

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
    const username = 'admin@gmail.com';
    const email = 'admin@gmail.com';
    const password = 'Password123!';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const { rows: existingUsers } = await client.sql`
      SELECT * FROM users WHERE username = ${username} OR email = ${email};
    `;

    if (existingUsers.length > 0) {
      await client.end();
      return NextResponse.json({ message: 'Default user already exists' }, { status: 200 });
    }

    // If the user doesn't exist, create it
    await client.sql`
      INSERT INTO users (username, password, email)
      VALUES (${username}, ${hashedPassword}, ${email});
    `;

    await client.end();
    return NextResponse.json({ message: 'Default user created successfully' }, { status: 201 });
  } catch (error) {
    await client.end();
    console.error('Error setting up default user:', error);
    return NextResponse.json({ error: 'Failed to set up default user' }, { status: 500 });
  }
} 