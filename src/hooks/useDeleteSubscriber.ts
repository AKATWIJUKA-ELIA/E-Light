import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const useDeleteSubscriber = () => {
  const DeleteSubscriber = useMutation(api.NewsLetter.DeleteSubscriber);

  const handleDelete = async (email: string) => {
    try {
      const result = await DeleteSubscriber({ email: email });
      return result;
    } catch (error) {
      throw error;
    }
  };

  return {handleDelete};
};

export default useDeleteSubscriber;