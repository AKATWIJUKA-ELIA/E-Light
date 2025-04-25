// Solution 2: Alternative approach with explicit type imports
import { clerkClient } from "@clerk/clerk-sdk-node"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params

  try {
    const user = await clerkClient.users.getUser(id)
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: `User not found or ${error}` }, { status: 404 })
  }
}
