import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAppSelector } from "@/hooks";
import { Id } from "../../convex/_generated/dataModel";
const useGetUserOrders = () => {
        const User = useAppSelector((state) => state.user.user);
    const Orders = useQuery(api.orders.getUserOrders,{userId:User?.User_id as Id<"customers"> });

    return {
        data: Orders,
        loading: Orders === undefined,
        error: null,
    };
};

export default useGetUserOrders;