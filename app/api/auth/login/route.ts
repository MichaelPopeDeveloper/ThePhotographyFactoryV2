import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  const db = new Database("./backend/db/main.db", { verbose: console.log });

  try {
    const stmt = db.prepare('SELECT id, username, password FROM users WHERE username = ?');
    const user = stmt.get(username);

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
  } finally {
    db.close();
  }
} 