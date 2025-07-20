import { Id } from "./_generated/dataModel";
import {action, internalQuery, mutation, query} from "./_generated/server"
import {v} from "convex/values"


export const createCart = mutation({
        args:{
              CartItem: v.object({
                product_id: v.id("products"),
                quantity: v.number(),
                cart_Owner_id: v.string(),

                  }),
        },
        handler: async (ctx, args) => {
                try{
                        const existing = await ctx.db
                        .query("cart")
                        .withIndex("by_product_id", (q) => q.eq("product_id", args.CartItem.product_id))
                        .unique();
                  if(existing){
                        await ctx.db.patch(existing._id, {
                              quantity: existing.quantity + 1,
                        });
                        return { success: true, message: "success" };
                  }
              await ctx.db.insert("cart", {
                    ...args.CartItem,
              });
              return { success: true, message: "success" };
        }catch{
                return { success: false, message: "Error creating cart" };
        }
        },
  })

          export const DeleteCart = mutation({
                args: { id: v.id("products") },
                handler: async (ctx, args) => {
                  const cart = await ctx.db.query("cart")
                    .withIndex("by_product_id", (q) => q.eq("product_id", args.id))
                    .first();
                  if (!cart) {
                    return {message:"Cart product not found", success: false } 
                  }
                  await ctx.db.delete(cart._id);
                  return {message:"success", success: true };
                },
              });

export const IncreaseCart = mutation({
                args: { id: v.id("products") },
                handler: async (ctx, args) => {
                  const cart = await ctx.db.query("cart")
                    .withIndex("by_product_id", (q) => q.eq("product_id", args.id))
                    .first();
                  if (!cart) {
                    return {message:"Cart product not found", success: false } 
                  }
                  await ctx.db.patch(cart._id,{
                        quantity:cart.quantity + 1,
                  });
                  return {message:"success", success: true };
                },
              });
        export const ReduceCart = mutation({
                args: { id: v.id("products") },
                handler: async (ctx, args) => {
                  const cart = await ctx.db.query("cart")
                    .withIndex("by_product_id", (q) => q.eq("product_id", args.id))
                    .first();
                  if (!cart) {
                    return {message:"Cart product not found", success: false } 
                  }
                  const NewQuantity = cart.quantity - 1;
                  if(NewQuantity < 1){
                        await ctx.db.delete(cart._id);
                        return {message:"success", success: true };
                  }
                  await ctx.db.patch(cart._id,{
                        quantity:NewQuantity,
                  });
                  
                  return {message:"success", success: true };
                },
              });
              export const getCart = query({
                args: {userId: v.string()},
                handler: async (ctx, args) => {
                  const cart = await ctx.db.query("cart")
                    .withIndex("by_cart_Owner_id", (q) => q.eq("cart_Owner_id", args.userId))
                    .collect();
                  return cart;
                }       
              });
              export const checkOutCart = mutation({
                args: { userId: v.id("customers") },
                handler: async (ctx, args) => {
                  const cart = await ctx.db.query("cart")
                    .withIndex("by_cart_Owner_id", (q) => q.eq("cart_Owner_id", args.userId))
                    .collect();
                  if (!cart || cart.length === 0) {
                    return { message: "Cart is empty", success: false };
                  }
                  cart.forEach(async (item) => {
                        const sellerId = await ctx.db.get(item.product_id ).then(product => product?.product_owner_id);
                        await ctx.db.insert("orders", {
                              user_id: args.userId,
                              product_id: item.product_id,
                              quantity: item.quantity,
                              order_status: "pending",
                              sellerId: sellerId as Id<"customers">,
                              specialInstructions: item.specialInstructions,
                        });
                        await ctx.db.delete(item._id);
                  })
                  
                  return { message: "Checkout successful", success: true };
                }
              })
