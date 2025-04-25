import { clerkClient } from "@clerk/clerk-sdk-node"
import {  NextResponse } from "next/server"

export async function POST(request) {
        const body = await request.json();
        const { id } = body;
  try {
    const user = await clerkClient.users.getUser(id)
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: `User not found or ${error}` },
      { status: 404 }
    )
  }
}
