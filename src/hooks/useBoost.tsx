import { api } from "../../convex/_generated/api"; 
import { useMutation } from "convex/react";
import { useAppSelector } from "@/hooks";
import { Boost } from "@/lib/utils";

const useBoost = () => {
        const User = useAppSelector((state) => state.user.user);
        const boost = useMutation(api.products.BoostProducts);

        const boostProduct = async (boostItem:Boost) =>{

                try{
                        if(!User || User.User_id.length === 0){
                                return { success: false, message: "User not authenticated", status: 401 };
                }

                const response = await boost({...boostItem, user_id: User?.User_id || ""});
                 if(!response?.success){
                        return { success: false, message: response.message,status: 400 };
                }
                return { success: true, message:response.message,status: 200 }; 
                }catch{
                        return { success: false, message: "Sorry,  Can not boost at this time please try again later" };
                        
                }
        }
        return { boostProduct };
}
export default useBoost;