import {action, internalQuery, mutation, query} from "./_generated/server"
import {v} from "convex/values"


export const createCart = mutation({
        args:{
              CartItem: v.object({
                product_id: v.string(),
                quantity: v.number(),
                product_owner_id: v.string(),

                  }),
        },
        handler: async (ctx, args) => {
                try{
              await ctx.db.insert("cart", {
                    ...args.CartItem,
              });
              return { success: true, message: "success" };
        }catch{
                return { success: false, message: "Error creating cart" };
        }
        },
  })