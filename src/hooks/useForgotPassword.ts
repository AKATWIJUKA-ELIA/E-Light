import { NextResponse } from "next/server";
import { api } from "../../convex/_generated/api"; 
import { useAction,useMutation } from "convex/react";
import { useSendMail } from "./useSendMail";
import { randomBytes } from 'crypto';
import { Id } from "../../convex/_generated/dataModel";

const useForgotPassword = () => {
        const {sendEmail} = useSendMail();
        const check = useAction(api.users.GetCustomerByEmail);
        const UpdateCustomer = useMutation(api.users.UpdateCustomer)
        const generateSecureToken = (length = 32): string=> {
                return randomBytes(length).toString('hex');
}
        const CheckUser = async (email:string) =>{
                try{
                const res = await check({email});
                 if(!res.success){
                        return NextResponse.json({ success: false, message: res.message }, { status: 400 });
                }
                const token = generateSecureToken();
                const user = res?.user
              
                const UserToUpdate = {
                        ...user,
                        _id: user?._id as Id<"customers"> , 
                        email: user?.email||"", 
                        username: user?.username||"", 
                        passwordHash: user?.passwordHash||"", 
                        role:user?.role||"",
                        isVerified:user?.isVerified||false,
                        reset_token: token,
                        reset_token_expires:Math.floor(Date.now() / 1000) + 10 * 60,
                        updatedAt:Date.now(),
                        lastLogin:Date.now(),
                }
                await UpdateCustomer({ User: UserToUpdate })


                const html = `<!DOCTYPE html>
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
      color: #333;
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
    <h2>Password Reset Request</h2>
    <p>Hello,</p>
    <p>We received a request to reset your password for your ShopCheap account.</p>
    <p>Click the button below to set a new password. If you did not request this, you can safely ignore this email.</p>
    <a 
      class="button"
      href="https://shopcheap.vercel.app/passwordChange?token=YOUR_RESET_TOKEN"
      target="_blank"
    >Reset Password</a>
    <p>If the button above does not work, copy and paste the following link into your browser:</p>
    <p>
      <a href="https://shopcheap.vercel.app/passwordChange?3c59c3c631572e859cbZZV05c6d4D637ad496d67b04ea8b0553ae4e1454933d27caf=${token}" target="_blank">
        https://shopcheap.vercel.app/passwordChange?3c59c3c631572e859cbZZV05c6d4D637ad496d67b04ea8b0553ae4e1454933d27caf=${token}
      </a>
    </p>
    <div class="footer">
      &copy; 2025 ShopCheap. All rights reserved.
    </div>
  </div>
</body>
</html>`
                const send = sendEmail(user?.email||"","Password Reset",html)
                const resp = await (await send).json()
                if(!resp.success){
                return NextResponse.json({ success: false, message:`${res.message}` }, { status: 200 });
                }
                return NextResponse.json({ success: true, message:`${res.message}\nA password reset link has been sent to your email` }, { status: 200 });
                }catch(error){
                        return NextResponse.json( { success: false, message: error });
                        
                }
        }
        return { CheckUser };
 }
 export default useForgotPassword;