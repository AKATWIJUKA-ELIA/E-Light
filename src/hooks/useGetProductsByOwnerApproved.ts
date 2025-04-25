import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const useGetProductsByOwnerApproved = (id: string) => {
    const products = useQuery(api.products.getProductsByOwnerApproved, id ? { id } : "skip"); // Prevent calling hook with an empty ID

    return {
        data: products, 
        loading: products === undefined, // Convex returns `undefined` while loading
        Error: null, // Convex doesn't provide an explicit error, so handle it elsewhere if needed
    };
};

export default useGetProductsByOwnerApproved;