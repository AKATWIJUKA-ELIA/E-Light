
import {  NextResponse } from 'next/server';
import {jwtDecode} from 'jwt-decode'
import { api } from "../../convex/_generated/api"; 
import { useMutation } from "convex/react";
import { CredentialResponse } from "@react-oauth/google"; 
import { useSendMail } from './useSendMail';
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

const useSignUpWithGoogle =()=>{
        const CreateUser = useMutation(api.users.CreateUser);
        const {sendEmail} = useSendMail()
        const Admin = process.env.NEXT_PUBLIC_ADMIN
        try{
        const SignUpWithGoogle = async (Response:CredentialResponse)=>{
                  const  token  = Response
                  try {
                         if (!token.credential) {
                                throw new Error("Google credential is missing");
        }
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
                        const res = await CreateUser(user);
                        const html = ` <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Password Reset</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    .button {
      display: inline-block;
      padding: 14px 28px;
      font-size: 16px;
      color: #fff;
      background-color: #007bff;
      border-radius: 5px;
      text-decoration: none;
      margin: 20px 0;
    }
    .button:hover {
      background-color: #0056b3;
    }
    .container {
      max-width: 480px;
      margin: auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      padding: 32px;
      font-family: Arial, sans-serif;
      color: black;
    }
    .footer {
      font-size: 12px;
      color: #999;
      margin-top: 32px;
      text-align: center;
    }
  </style>
</head>
<body style="background:#f4f4f4;">

  <div class="container">
<a href="https://shopcheap.vercel.app/" > 
<div 
  style="
    background-image: url('https://cheery-cod-687.convex.cloud/api/storage/143325e4-3c05-4b88-82ba-cbbfa7fcd594');
    background-size: contain;  
    background-repeat: no-repeat;
    background-position: center; 
    width: 200px;
    height: 100px;
  "
>
  
</div></a>
    <h2><strong>Welcome to ShopCheap - Thanks for Joining Us</strong></h2>
    <h1 class="" style="color:black" >Hello, <span style="color:blue"> ${user.username} </span></h1>
    <h3>Thank you for Joining  ShopCheap! We're thrilled to have you on board.

Subscribe to Our NewsLetter to be the first to receive exclusive updates, tips, promotions, or industry insights. Expect valuable content delivered straight to your inbox .

If you ever have questions or feedback, just reply to this email—we'd love to hear from you!\n

Thanks again for joining us. \n

Best regards,\n
ShopCheap\n
https://shopcheap.vercel.app/</h3>
    <div class="footer">
      &copy; 2025 ShopCheap. All rights reserved.
    </div>
  </div>
</body>
</html>`

                        
                        // console.log("user :",user)
                        if(!res.success){
                    return NextResponse.json({ success: false, message: res.message }, { status: 400 });
                        }
                        const userEmail =  sendEmail( `${user.email}`,"Welcome to ShopCheap", html)
                        const userEmailres = await (await userEmail).json()
                        if(!userEmailres.success){
                                sendEmail( `${Admin}`,"New User Created", html)
                                return
                        }
                        sendEmail( `${Admin}`,"New User Created", html)
                        return NextResponse.json({ success: true, message:res.message }, { status: 200 });
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