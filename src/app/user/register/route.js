import { NextResponse } from 'next/server';
import db from '../../../database/database';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { name, username, email, password, phone } = await req.json();

    if (!email || !password || !username) {
      return NextResponse.json(
        { message: 'Username, email and password are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingEmail = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingEmail.rows.length > 0) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
    }

    const existingUser = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
      return NextResponse.json({ message: 'Username already taken' }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const result = await db.query(
      'INSERT INTO users (name, username, email, phone, password, balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name || username, username, email, phone || '', hashedPassword, 0]
    );

    const newUser = result.rows[0];

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      payload: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        balance: newUser.balance,
        created_at: newUser.created_at
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
