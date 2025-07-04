import {ConvexClient} from "convex/browser";
import { api } from "../../convex/_generated/api";
import { User } from "./utils";
import { Id } from "../../convex/_generated/dataModel";

const convex = new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getUserById(id:  Id<"customers">) {
  if (!id) return { user: null, loading: false, error: "No ID provided" };
  try {
    const user = await convex.query(api.users.GetCustomerById, { id });
    return {
      user,
    };
  } catch (e) {
    return {
      user: null,
      loading: false,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}
export async function UpdateUser(userToUpdate: User | null) {
    if (!userToUpdate) {
        return { success: false, message: "No user provided" };
    }
    try {
        await convex.mutation(api.users.UpdateCustomer, { User: userToUpdate });
        return { success: true, message: "User updated successfully" };
    } catch (e) {
        return { success: false, message: e instanceof Error ? e.message : "Unknown error" };
    }
}