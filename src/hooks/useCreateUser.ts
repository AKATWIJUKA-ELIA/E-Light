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
                await create(User);
                return  { success: true };
                }catch(error){
                        return { success: false, error: error };
                        
                }
        }
        return { CreateUser };
 }
 export default useCreateUser;