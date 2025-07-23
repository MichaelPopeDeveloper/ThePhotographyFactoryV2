import { createClient } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  try {
    // THIS IS INSECURE AND FOR DEVELOPMENT ONLY
    // bYXPASSES SSL CERTIFICATE VALIDATION
    const client = createClient({
      ssl: {
        rejectUnauthorized: false,
      },
    });
    await client.connect();
    const { rows } = await client.sql`SELECT id, username, password FROM users WHERE username = ${username}`;
    const user = rows[0];

    if (!user) {
      await client.end();
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // In a real application, you would create a session/token here
      await client.end();
      return NextResponse.json({ message: 'Login successful', userId: user.id });
    } else {
      await client.end();
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 