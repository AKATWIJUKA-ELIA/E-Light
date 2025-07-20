import {action, internalQuery, mutation, query} from "./_generated/server"
import {v} from "convex/values"
import { api, internal } from "../convex/_generated/api";
import { Id } from "./_generated/dataModel";



export const getUserOrders = query({
                args: { userId: v.string() },
                handler: async (ctx, args) => {
                  const orders = await ctx.db.query("orders")
                    .withIndex("by_user_id", (q) => q.eq("user_id", args.userId))
                    .collect();
                  return await Promise.all(
      orders.map(async order => ({
        ...order,
        product: await ctx.db.get(order.product_id as Id<"products">),
      }))
    );
  }
});



export const getAllOrders = query({
        args: {},
        handler: async (ctx) => {
                const orders = await ctx.db.query("orders").collect();
                return await Promise.all(
      orders.map(async order => ({
        ...order,
        product: await ctx.db.get(order.product_id as Id<"products">),
      }))
    );
}
})


export const getOrderById = query({
                args: { orderId: v.id("orders") },
                handler: async (ctx, args) => {
                         const order = await ctx.db.get(args.orderId);
                        
                        if (!order) {
                                return { success: false, message: "Order not found", status: 404 };
                        }       
                        return { success: true, order: order };
                }
              });

export const getSellerOrders = query({
                args: { userId: v.id("customers") },
                handler: async (ctx, args) => {
                  const orders = await ctx.db.query("orders")
                    .withIndex("by_seller_id", (q) => q.eq("sellerId", args.userId))
                    .collect();
                  return await Promise.all(
      orders.map(async order => ({
        ...order,
        product: await ctx.db.get(order.product_id as Id<"products">),
      }))
    );
  }
});

export const updateOrder = mutation({
        args: {
                order: v.object({
                        _id: v.id("orders"),
                        user_id: v.string(),
                       product_id: v.string(),
                        order_status: v.string(),
                        specialInstructions: v.optional(v.string()),
                        cost: v.optional(v.number()),
                }),
        },
        handler: async (ctx, args) => {
                try {
                        const order = await ctx.db.get(args.order._id);
                        if (!order) {
                                return { success: false, message: "Order not found", status: 404 };
                        }
                        const updatedOrder = await ctx.db.patch(args.order._id, args.order);
                        return { success: true, order: updatedOrder };
                } catch (error) {
                        console.error("Error updating order:", error);
                        return { success: false, message: "Internal Server Error", status: 500 };
                }
        }
});

export const deleteOrder = mutation({
        args: { orderId: v.id("orders") },
        handler: async (ctx, args) => {
        try {
        await ctx.db.delete(args.orderId);
        return { success: true, message: "Order deleted successfully" };
        } catch (error) {
        console.error("Error deleting order:", error);
        return { success: false, message: "Internal Server Error", status: 500 };
        }
        }
        });