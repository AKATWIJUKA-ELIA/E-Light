import {  NextRequest, NextResponse } from "next/server"
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
        

  try {
        const { email, password } = await request.json();
        if (!email || !password) {
      return new Response(JSON.stringify({ message: "Missing credentials" }), {
        status: 400,
      });
    }
    const User = useQuery(api.users.GetCustomer, email ? { email } : "skip"); // Prevent calling hook with an empty ID
    if (!User) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const HashedPassword = User.passwordHash
    const isMatch = await bcrypt.compare(password, HashedPassword);

    if (!isMatch) {
        return new Response(JSON.stringify({ message: "Invalid password" }), {
        status: 401,
      });
    }
        return new Response(JSON.stringify({ message: "Login successful" }), {
        status: 200,
    });


}catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
}
}
