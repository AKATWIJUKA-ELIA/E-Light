import { api } from "../../../../convex/_generated/api"; 
import { useMutation } from "convex/react";
import { NextRequest, NextResponse } from 'next/server';
// interface user {
//         username: string,
//         email: string,
//         passwordHash: string,
//         phoneNumber: string,
//         profilePicture:string,
//         isVerified: boolean,
//         role: string,
//         reset_token: string,
//         reset_token_expires:number,
//         updatedAt: number,
//         lastLogin: number,
// }

export async function POST(req: NextRequest) {
  const create = useMutation(api.users.CreateUser);
  try{
 const { username,
        email,
        passwordHash,
        phoneNumber,
        profilePicture,
        isVerified,
        role,
        reset_token,
        reset_token_expires,
        updatedAt,
        lastLogin,} = await req.json()
        
   try{
                await create({
                        username,
                        email,
                        passwordHash,
                        phoneNumber,
                        profilePicture,
                        isVerified,
                        role,
                        reset_token,
                        reset_token_expires,
                        updatedAt,
                        lastLogin})
                return NextResponse.json({ success: true, message: 'Your Account was created' }, { status: 200 });
                }catch(error){
                        return { success: false, error: error };
                }
    
  } catch (error) {
    console.error('Error creating Account:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}