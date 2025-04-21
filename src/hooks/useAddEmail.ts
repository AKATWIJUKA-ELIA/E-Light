import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const useAddEmail = (email: string) => {
    const addEmail = useMutation(api.NewsLetter.AddEmail); // Use mutation for adding email
    const products = addEmail({ email }); // Call the mutation with the email

    return {
        data: products, 
        loading: products === undefined, // Convex returns `undefined` while loading
        Error: null, // Convex doesn't provide an explicit error, so handle it elsewhere if needed
    };
};

export default useAddEmail;