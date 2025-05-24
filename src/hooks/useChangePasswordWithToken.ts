import { NextResponse } from "next/server";
import { api } from "../../convex/_generated/api"; 
import { useAction,useMutation } from "convex/react";
import { useSendMail } from "./useSendMail";
import { Id } from "../../convex/_generated/dataModel";

const useChangePasswordWithToken = () => {
        const {sendEmail} = useSendMail();
        const check = useAction(api.users.GetCustomerByTokenAction);
        const UpdateCustomer = useMutation(api.users.UpdateCustomer)
        const CheckUser = async (token:string,Newpassword:string) =>{
                try{
                const res = await check({token});
                 if(!res.success){
                        return NextResponse.json({ success: false, message: res.message }, { status: 400 });
                }
       
                const user = res?.user
                const isTokenValid = user?.reset_token_expires  && user.reset_token_expires > Math.floor(Date.now() / 1000) 
                if(!isTokenValid){
                        return NextResponse.json({ success: false, message: "Token has Expired " }, { status:402})
                }
                
              
                const UserToUpdate = {
                        ...user,
                        _id: user?._id as Id<"customers"> , 
                        email: user?.email||"", 
                        username: user?.username||"", 
                        passwordHash: Newpassword||"", 
                        role:user?.role||"",
                        isVerified:user?.isVerified||false,
                        reset_token: "",
                        reset_token_expires:Date.now(),
                        updatedAt:Date.now(),
                        lastLogin:Date.now(),
                }
                await UpdateCustomer({ User: UserToUpdate })



                const send = sendEmail(user?.email||"","Password Changed",`Hello ${user?.username},\nYour password has been changed successfully. You can now log in with your new credentials.`)
                const resp = await (await send).json()
                if(!resp.success){
                return NextResponse.json({ success: false, message:`${res.message}` }, { status: 200 });
                }
                return NextResponse.json({ success: true, message:`${res.message}\nYour password has been changed successfully.` }, { status: 200 });
                }catch(error){
                        return NextResponse.json( { success: false, message: error });
                        
                }
        }
        return { CheckUser };
 }
 export default useChangePasswordWithToken;