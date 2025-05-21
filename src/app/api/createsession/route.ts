import { NextRequest, NextResponse } from 'next/server';
import { createSession } from "../../../lib/sessions"

export async function POST(req: NextRequest) {
  const { userId, role, isVerified } = await req.json();
        console.error('Details ', userId, role, isVerified);
  try {
    await createSession(userId, role, isVerified);
    return NextResponse.json({ success: true, message: 'Session created' }, { status: 200 });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}