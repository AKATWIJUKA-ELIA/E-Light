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



                const send = sendEmail(user?.email||"","Password Reset",`http://localhost:3000/passwordChange?3c59c3c631572e859cbZZV05c6d4D637ad496d67b04ea8b0553ae4e1454933d27caf=${token}`)
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