import {mutation, query} from "./_generated/server"
import { action } from "./_generated/server";
import {v} from "convex/values"
import { ConvexError } from "convex/values";
import { api } from "../convex/_generated/api";
import bcrypt from "bcryptjs";

export const CreateUser = mutation({
        args:{
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
        },handler:async(ctx,args)=>{
                try{
                const user = await ctx.db.insert("customers",{
                        ...args
                }) 
                return user
        }catch{
                        throw new ConvexError({error:"Error creating user",message:"Error creating user",status:500})
                }
                
        }
        })
        export const GetCustomer = query({
                args:{email:v.string()},
                handler:async(ctx,args)=>{
                        const customer = await ctx.db.query("customers").filter((q)=> q.eq(q.field("email"), args.email)).first(); 
                        return customer
                }
                
        })
        export const AuthenticateUser = action({
                args:{email:v.string(), password:v.string()},
                handler:async(ctx,args)=>{
                        const user = await ctx.runQuery(api.users.GetCustomer, {
                                email: args.email,
                        });
                        if (!user) {
                               return { success:false ,status: 404,message: "User not Found" };
                        }
                        
                        const isMatch = await bcrypt.compare(args.password, user.passwordHash);
                        if (!isMatch) {
                          return { success:false ,status: 401,message: "Invalid Password" };
                }
                   return { success:true ,status: 201,message: "Success" };
}
})