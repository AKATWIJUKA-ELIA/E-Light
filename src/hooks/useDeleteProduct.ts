import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel"; // Import the Id type

const useDeleteProduct = () => {
  const deleteProduct = useMutation(api.products.DeleteProduct);

  const handleDelete = async (id: string|undefined) => {
    try {
      const result = await deleteProduct({ id: id as Id<"products"> });
      return result;
    } catch (error) {
      console.error("Failed to delete product:", error);
      throw error;
    }
  };

  return handleDelete;
};

export default useDeleteProduct;