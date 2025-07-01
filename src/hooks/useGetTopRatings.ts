import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const useGetTopRatings = () => {
    const products = useQuery(api.products.getTopRatedProducts,{}); 

    return {
        TopRatings: products, 
        loading: products === undefined, // Convex returns `undefined` while loading
        error: null, // Convex doesn't provide an explicit error, so handle it elsewhere if needed
    };
};

export default useGetTopRatings;