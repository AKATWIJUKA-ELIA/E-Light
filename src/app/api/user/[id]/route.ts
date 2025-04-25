import { clerkClient } from "@clerk/clerk-sdk-node"
import { NextResponse } from "next/server"

// Fix 1: Correct parameter types for route handlers
export async function GET(req: Request, { params }: { params: { id: string } }) {
  // Fix 2: Remove the await from params access
  const { id } = params

  try {
    const user = await clerkClient.users.getUser(id)
    return NextResponse.json(user)
  } catch (error) {
    // Fix 3: Use proper template literals with backticks
    return NextResponse.json({ error: `User not found or ${error}` }, { status: 404 })
  }
}