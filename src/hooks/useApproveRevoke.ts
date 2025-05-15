import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel"; // Import the Id type

const useApproveRevoke = () => {
  const EditProduct = useMutation(api.products.ApproveRevoke);

  const handleEdit = async (id: string|undefined) => {
    try {
      const result = await EditProduct({ id: id as Id<"products"> });
      return result;
    } catch (error) {
      console.error("Failed to Edit product:", error);
      throw error;
    }
  };

  return handleEdit;
};

export default useApproveRevoke;