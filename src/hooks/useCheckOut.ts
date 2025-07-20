import { useAppSelector } from "@/hooks";
import { api } from "../../convex/_generated/api"; 
import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";


const useCheckOutCart = () =>{
        const checkOut  = useMutation(api.cart.checkOutCart)
        const User = useAppSelector(state=> state.user.user)
        const handleCheckOut = async()=>{
                try{
                        const res = await checkOut({userId:User?.User_id as Id<"customers">})
                        if(!res.success){
                                return {success:false, message:res.message}
                        }
                        return {success:true, message:res.message}
                }catch{
                        return {
                                success:false,message:"Error Can not check Out at this time"
                        }
                }
        }

        return {handleCheckOut}
}
export default useCheckOutCart