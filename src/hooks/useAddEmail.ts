import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const useAddEmail = () => {
  const addEmail = useMutation(api.NewsLetter.AddEmail);

  const save = async (email: string) => {
    try {
      const result = await addEmail({ email });
      return result;
    } catch (error) {
      console.error("Error saving email:", error);
      throw error;
    }
  };

  return save;
};

export default useAddEmail;
