import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  NewsLetter: defineTable({ email: v.string() }).index("by_email", ["email"]),
  cart: defineTable({
    product_id: v.string(),
    product_owner_id: v.string(),
    quantity: v.number(),
  }),
  cartegories: defineTable({ 
        cartegory: v.string(),
        // SubCategories: v.optional( v.array(v.object({subpic:v.string(),subname:v.string()})),)
   }),

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
  .index("by_username", ["username"])
  .index("by_reset_token", ["reset_token"]),

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
    product_embeddings:v.optional(v.array(v.number())),
    product_image_embeddings:v.optional(v.array(v.number())),

     _creationTime: v.number()
  }).index("by_product_category", ["product_cartegory"])
  .vectorIndex("by_product_embeddings",{
        vectorField:"product_embeddings",
        dimensions:384
  })

  .vectorIndex("product_image_embeddings",{
        vectorField:"product_image_embeddings",
        dimensions:512
  }),
reviews : defineTable({
    product_id: v.string(),
    reviewer_id: v.string(),
    title: v.string(),
    rating: v.number(),
    review: v.string(),
     verified: v.optional(v.boolean()),
    _creationTime: v.number(),
}).index("by_product_id", ["product_id"])
.index("by_reviewer_id", ["reviewer_id"])
});
