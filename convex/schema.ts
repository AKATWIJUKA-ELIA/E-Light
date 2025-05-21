import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  NewsLetter: defineTable({ email: v.string() }).index("by_email", ["email"]),
  cart: defineTable({
    product_cartegory: v.string(),
    product_condition: v.string(),
    product_description: v.string(),
    product_id: v.string(),
    product_image: v.string(),
    product_name: v.string(),
    product_owner_id: v.string(),
    product_price: v.string(),
    quantity: v.string(),
    user_id: v.string(),
  }),
  cartegories: defineTable({ cartegory: v.string() }),

  customers: defineTable({
    username: v.string(),
    email: v.string(),
    passwordHash: v.string(),
    phoneNumber: v.optional(v.string()),
    profilePicture: v.optional(v.string()),
    isVerified: v.boolean(),
    role: v.string(),
    reset_token: v.optional(v.string()),
    reset_token_expires:v.number(),
    updatedAt: v.number(),
    lastLogin: v.optional(v.number()),
  }).index("by_email", ["email"])
  .index("by_username", ["username"]),

  orders: defineTable({
    order_status: v.string(),
    product_cartegory: v.string(),
    product_condition: v.string(),
    product_description: v.string(),
    product_id: v.string(),
    product_image: v.string(),
    product_name: v.string(),
    product_owner_id: v.string(),
    product_price: v.string(),
    quantity: v.string(),
    user_id: v.string(),
  }),
  products: defineTable({
    approved: v.boolean(),
    product_cartegory: v.string(),
    product_condition: v.string(),
    product_description: v.string(),
    product_image: v.array(v.string()),
    product_name: v.string(),
    product_owner_id: v.string(),
    product_price: v.string(),
     _creationTime: v.number()
  }),
});