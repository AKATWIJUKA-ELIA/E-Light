"use client";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ConvexError } from "convex/values";
import { useState } from "react";

type Result =
  | { success: true }
  | { success: false; error: string };

const useValidateUsername = () => {
  const CheckUserName = useMutation(api.LiveValidation.Validateusername);
  const [UsernameError, setUsernameError] = useState(false);

  const CheckUsername = async (username: string):Promise<Result>=> {
    try {
        console.log("username",username)
       await CheckUserName({username});
      setUsernameError(false); // Clear any previous error
      return { success: true };
    } catch (error) {
      if (error instanceof ConvexError) {
        // console.error("Convex application error:", error.data);
        setUsernameError(true);
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
    CheckUsername,
    UsernameError,
  };
};

export default useValidateUsername;

