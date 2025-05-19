import { query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const Validateusername = query({
        args:{username:v.string()},
        handler: async(ctx, args)=>{
                const existing = await ctx.db
                .query("customers")
                .withIndex("by_username", (q) => q.eq("username", args.username))
                .unique();

                if (existing) {
                        throw new ConvexError("This Username is already taken.");
                        }
                }
        
})