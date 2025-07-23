import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: {
    rejectUnauthorized: false,
  },
});
 
export async function POST(request: Request) {
  const { username, password } = await request.json();
 
  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }
 
  try {
    const users = await sql`SELECT id, username, password FROM users WHERE username = ${username}`;
    const user = users[0];

    console.log(username);
    console.log(user);
    console.log(password);
    console.log(users);
    console.log(process.env.POSTGRES_URL);
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }
 
    const isPasswordValid = await bcrypt.compare(password, user.password);
 
    if (isPasswordValid) {
      // In a real application, you would create a session/token here
      return NextResponse.json({ message: 'Login successful', userId: user.id });
    } else {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 