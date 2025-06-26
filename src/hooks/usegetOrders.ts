import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAppSelector } from "@/hooks";
import useGetProductsByIds from "./useGetProductsByIds";
const useGetOrders = () => {
        const User = useAppSelector((state) => state.user.user);
    const Orders = useQuery(api.cart.getOrders,{userId:User?.User_id ||""}); 
    const productIds = Orders?.map((order) =>order.product_id)
    const { data: products,  } = useGetProductsByIds((productIds?.flatMap(id => id)) || []);
    const FinalOrders = Orders?.map((order)=>{
        const product = products?.find((p)=>p?._id === order.product_id)
        return{
                ...order,
                product 
        }
} 
)
    


    return {
        data: FinalOrders,
        loading: FinalOrders === undefined,
        error: null,
    };
};

export default useGetOrders;