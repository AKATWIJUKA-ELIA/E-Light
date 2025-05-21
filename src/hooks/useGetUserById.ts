import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const useGetUserById = (id: string) => {
    const product = useQuery(api.users.GetCustomerById, id ? { id } : "skip"); // Prevent calling hook with an empty ID

    return {
        user: product, 
        loading: product === undefined, // Convex returns `undefined` while loading
        error: null, // Convex doesn't provide an explicit error, so handle it elsewhere if needed
    };
};

export default useGetUserById;