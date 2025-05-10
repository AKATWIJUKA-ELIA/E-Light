"use client"
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ConvexError } from "convex/values"; // Import ConvexError

const useAddEmail = () => {
  const addEmail = useMutation(api.NewsLetter.AddEmail);

  const save = async (email: string) => {
    try {
      const result = await addEmail({ email });
      return result;
    } catch (error) {
      // Check if the error is a ConvexError and handle it specifically
      if (error instanceof ConvexError) {
        console.error("Convex application error:", error.data); // Log the data associated with the error
        // You can re-throw the ConvexError or throw a new error with a more specific message
        throw new Error(`Failed to add email: ${error.data}`); // Example: Display error data to user
      } else {
        // Handle other types of errors (e.g., network issues, developer errors)
        console.error("An unexpected error occurred:", error);
        throw new Error("An unexpected error occurred while adding the email.");
      }
    }
  };

  return save;
};

export default useAddEmail;
