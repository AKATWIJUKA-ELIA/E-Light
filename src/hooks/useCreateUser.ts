import { NextResponse } from "next/server";
import { api } from "../../convex/_generated/api"; 
import { useMutation } from "convex/react";
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

        const CreateUser = async (User:user) =>{
                try{
                const res = await create(User);
                 if(!res.success){
                        return NextResponse.json({ success: false, message: res.message }, { status: 400 });
                }
                return NextResponse.json({ success: true, message:res.message }, { status: 200 });
                }catch(error){
                        return NextResponse.json( { success: false, message: error });
                        
                }
        }
        return { CreateUser };
 }
 export default useCreateUser;