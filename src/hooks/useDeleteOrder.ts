import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

const useDeleteOrder = () => {
  const deleteProduct = useMutation(api.orders.deleteOrder);

  const handleDelete = async (id: string|undefined) => {
    try {
      const result = await deleteProduct({ orderId: id as Id<"orders"> });
      return result;
    } catch (error) {
      console.error("Failed to delete Order:", error);
      throw error;
    }
  };

  return {handleDelete};
};

export default useDeleteOrder;