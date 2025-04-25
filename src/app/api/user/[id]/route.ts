import { clerkClient } from "@clerk/clerk-sdk-node";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await clerkClient.users.getUser(params.id);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: `User not found or ${error}` },
      { status: 404 }
    );
  }
}
