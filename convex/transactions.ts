import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import {action, internalQuery, mutation, query} from "./_generated/server"
import {v} from "convex/values"

export const CreateTransaction = mutation({
        args:{
              Transaction: v.object({
                user_id: v.id("customers"),
                order_id: v.optional(v.id("orders")),
                amount: v.number(),
                currency: v.optional(v.string()),
                status: v.union(
                v.literal("pending"),
                v.literal("completed"),
                v.literal("failed"),
                v.literal("cancelled"),
                v.literal("refunded")
                ),
                payment_method: v.union(
                v.literal("card"),
                v.literal("mobile-money"),
                v.literal("bank-transfer"),
                v.literal("cash"),
                v.literal("other")
                ),
                reference: v.optional(v.string()),
                type:  v.union(
                v.literal("purchase"),
                v.literal("refund"),
                v.literal("becoming-a-seller"),
                v.literal("other")
                ),
                  }),
        },
        handler: async (ctx, args) => {
                try{
                        const existing = await ctx.db
                        .query("transactions")
                        .withIndex("by_order_and_user", (q) => q.eq("order_id", args.Transaction.order_id).eq("user_id", args.Transaction.user_id))
                        .unique();
                  if(existing){
                        return { success: false, message: "Transaction already exists" };
                  }
              await ctx.db.insert("transactions", {
                    ...args.Transaction,
              });
              return { success: true, message: "Transaction created successfully" };
        }catch{
                return { success: false, message: "Error creating transaction" };
        }
        },
  })