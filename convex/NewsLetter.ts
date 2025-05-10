import {mutation, query} from "./_generated/server"
import {v} from "convex/values"

export const AddEmail = mutation({
        args: { email: v.string() },
        handler: async (ctx, args) => {
          // Check if the email already exists
          const existing = await ctx.db
      .query("NewsLetter")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
      
          if (existing) {
            throw new Error("This email is already subscribed.");
          }
      
          // If not found, insert the email
          await ctx.db.insert("NewsLetter", {
            email: args.email,
          });
        },
      });