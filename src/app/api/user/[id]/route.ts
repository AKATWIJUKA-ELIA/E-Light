import { clerkClient } from "@clerk/clerk-sdk-node"
import { type NextRequest, NextResponse } from "next/server"

// Solution 1: Use the correct Next.js type definition
type RouteParams = {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const user = await clerkClient.users.getUser(params.id)
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: `User not found or ${error}` }, { status: 404 })
  }
}
