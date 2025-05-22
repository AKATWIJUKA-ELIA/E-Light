
import { NextRequest, NextResponse } from 'next/server';
import {jwtDecode} from 'jwt-decode'
import { api } from "../../convex/_generated/api"; 
import { useMutation } from "convex/react";
interface user {
        username: string,
        email: string,
        passwordHash: string,
        phoneNumber: string,
        profilePicture:string,
        isVerified: false,
        role: string,
        reset_token: "",
        reset_token_expires:0,
        updatedAt: 0,
        lastLogin: 0,
}
interface DecodedToken {
  iss?: string;
  aud?: string;
  sub?: string;
  email?: string;
  email_verified?: boolean;
  nbf?: number;
  name?: string;
  picture?: string;
  given_name?: string;
  iat?: number;
  exp?: number;
  jti?: string;
}
interface res{
        clientId:string|""
        credential:string|""
        select_by:string|""
}
const useSignUpWithGoogle =()=>{
        const CreateUser = useMutation(api.users.CreateUser);
        try{
        const SignUpWithGoogle = async (Response:res)=>{
                  const  token  = Response
                  try {
                        const decoded = jwtDecode<DecodedToken>(token.credential);
                        const user:user = {
                                username:decoded.name||"",
                                email:decoded.email||"",
                                profilePicture:decoded.picture||"",
                                passwordHash:"",
                                phoneNumber:"",
                                isVerified:false,
                                role:"user",
                                reset_token:"",
                                reset_token_expires:0,
                                updatedAt:0,
                                lastLogin:0,
                        } 
                        await CreateUser(user);
                        console.log("user :",user)
                        
                    return NextResponse.json({ success: true, message: 'Your Account was created' }, { status: 200 });
                  } catch (error) {
                    console.error('Error creating Account:', error);
                    return NextResponse.json({ success: false, message: 'Error Creating your account try again Later' }, { status: 500 });
                  }
        }
        
        return {SignUpWithGoogle};
}catch(error){
        throw new Error((error instanceof Error) ? error.message : String(error));
}

}
export default useSignUpWithGoogle;