import { api } from "../../convex/_generated/api"; 
import { useMutation } from "convex/react";
import { useSendMail } from './useSendMail';
import { WelcomeEmail } from '@/EmailTemplates/Templates';
import { User } from "@/lib/utils";
interface user {
        username: string,
        email: string,
        passwordHash: string,
        phoneNumber: string,
        profilePicture:string,
        isVerified: boolean,
        role: string,
        reset_token: string,
        reset_token_expires:number,
        updatedAt: number,
        lastLogin: number,
}
const useCreateUser = () => {
        const create = useMutation(api.users.CreateUser);
                const {sendEmail} = useSendMail()
                const Admin = process.env.NEXT_PUBLIC_ADMIN
        const CreateUser = async (User:user) =>{
                try{
                const res = await create(User);
                 if(!res.success){
                        return { success: false, message: res.message , status: 400 };
                }
                sendEmail(`${User.email}`,"Welcome to ShopCheap", WelcomeEmail(User as User),"marketing");
                sendEmail(`${Admin}`,"New User Created", `<html><body><h1>New User Created</h1><p>Username: ${User.username}</p><p>Email: ${User.email}</p></body></html>`,"marketing");
                return { success: true, message:res.message ,  status: 200 };
                }catch(error){
                        return  { success: false, message: error as string , status: 500 };
                        
                }
        }
        return { CreateUser };
 }
 export default useCreateUser;