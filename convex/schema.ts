import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  NewsLetter: defineTable({ email: v.string() }).index("by_email", ["email"]),

  cart: defineTable({
    product_id: v.string(),
    cart_Owner_id: v.string(),
    quantity: v.number(),
  }).index("by_cart_Owner_id", ["cart_Owner_id"])
  .index("by_product_id", ["product_id"]),

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
    product_id: v.string(),
    quantity: v.number(),
    user_id: v.string(),
  }).index("by_user_id", ["user_id"])
  .index("by_product_id", ["product_id"]),
  
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
    product_sponsorship:v.optional(v.object({
        type:v.optional(v.union(
                v.literal("basic"),
                v.literal("premium"),
                v.literal("platinum"),)),
        duration: v.optional(v.number()),
        status: v.optional(v.union(
                v.literal("active"),
                v.literal("expired"),
        )),
    }),),
  product_likes: v.optional(v.number()),
  product_views: v.optional(v.number()),
  _creationTime: v.number()
  }).index("by_product_category", ["product_cartegory"])
  .index("by_product_owner", ["product_owner_id"])
  .index("by_sponsorship", ["product_sponsorship.type"])
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
.index("by_reviewer_id", ["reviewer_id"]),

bookmarks: defineTable({
    user_id: v.string(),
    product_id: v.string(),
    _creationTime: v.number(),
}).index("by_user_id", ["user_id"])
.index("by_product_id", ["product_id"]),

interactions:defineTable( {
  user_id: v.string(),
  product_id: v.string(),
  type: v.object({
        view:v.object({
                count:v.number()
        }),
        cart:v.object({
                count:v.number()
        })
  }), // e.g. "view", "cart", "purchase"
}).index("by_user", ["user_id"])
.index("by_product_id", ["product_id"])
.index("by_user_and_type_cart", ["user_id", "type.cart.count"])
.index("by_user_and_type_view", ["user_id", "type.view.count"]),
boosts: defineTable({
    product_id: v.string(),
    user_id: v.string(),
    boost_type: v.string(),
    duration: v.number(),
    status: v.union(
        v.literal("active"),
        v.literal("expired")),
}).index("by_product_id", ["product_id"])
.index("by_boost_type", ["boost_type"])
.index("by_user_and_status",["user_id","status"])
});
