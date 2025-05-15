"use client";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ConvexError } from "convex/values";
import { useState } from "react";

type SaveResult =
  | { success: true }
  | { success: false; error: string };

const useAddEmail = () => {
  const addEmail = useMutation(api.NewsLetter.AddEmail);
  const [emailError, setemailError] = useState(false);

  const save = async (email: string): Promise<SaveResult> => {
    try {
      await addEmail({ email });
      setemailError(false); // Clear any previous error
      return { success: true };
    } catch (error) {
      if (error instanceof ConvexError) {
        // console.error("Convex application error:", error.data);
        setemailError(true);
        return { success: false, error: error.data };
      } else {
        // console.error("Unexpected error:", error);
        return {
          success: false,
          error: "An unexpected error occurred while adding the email.",
        };
      }
    }
  };

  return {
    save,
    emailError,
  };
};

export default useAddEmail;

