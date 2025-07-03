import { api } from "../../convex/_generated/api"; 
import { useMutation, useQuery } from "convex/react";
import { useAppSelector } from "@/hooks";
import { Boost, Product } from "@/lib/utils";
import useGetProductsByIds from "./useGetProductsByIds";
import { useEffect, useState } from "react";


const useBoost = () => {
        
        const User = useAppSelector((state) => state.user.user);
        const boost = useMutation(api.products.BoostProducts);
        const ids = useQuery(api.products.getBoostedProductsIds, { user_id: User?.User_id || "" });
        const [BoostedProducts, setBoostedProducts] = useState<Product[]|null>([])

        const { data: products,loading } = useGetProductsByIds(ids ? ids.flat() : []);
        useEffect(() => {
        if (products) {
        console.log("Fetched Boosts:", products);
        setBoostedProducts(products.filter((p): p is Product => p !== null));
        }
        }, [loading]);

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
        return { boostProduct,BoostedProducts };
}
export default useBoost;