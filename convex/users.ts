import {mutation, query} from "./_generated/server"
import { action } from "./_generated/server";
import {v} from "convex/values"
import { ConvexError } from "convex/values";
import { api } from "../convex/_generated/api";
import bcrypt from "bcryptjs";
type Response = {
  success: boolean;
  message: string;
  status: number;
  user:{
        _id: string,
         username: string,
            email: string,
            passwordHash: string,
            phoneNumber?: string,
            profilePicture?: string,
            isVerified: boolean,
            role: string,
            reset_token?: string,
            reset_token_expires?:number,
            updatedAt?: number,
            lastLogin?: number,
  }|null
};
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
                        const existing = await ctx.db
                        .query("customers")
                        .withIndex("by_email", (q) => q.eq("email", args.email))
                        .unique();
                        if(existing){
                                return {success:false,message:"This Email Already Exisits",status:400};
                        }
                const user = await ctx.db.insert("customers",{
                        ...args
                }) 
                return {success:true,message:"Success",status:200,user:user};
        }catch{
                        throw new ConvexError({error:"Error creating user",message:"Error creating user",status:500})
                }
                
        }
        })
        export const GetCustomer = query({
                args:{email:v.string()},
                handler:async(ctx,args)=>{
                        const customer = await ctx.db.query("customers")
                        .withIndex("by_email", (q) => q.eq("email", args.email))
                        .unique();
                        if (!customer) {
                               return { success:false ,status: 404,message: "User not Found",user:null };
                        }
                        return { success:true, status: 200, message: "User found", user: customer };
                }
                
        })

                export const GetCustomerByToken = query({
                args:{token:v.string()},
                handler:async(ctx,args)=>{
                        const customer = await ctx.db.query("customers")
                        .withIndex("by_reset_token", (q) => q.eq("reset_token", args.token))
                        .unique();
                        if (!customer) {
                               return { success:false ,status: 404,message: "User not Found",user:null };
                        }
                        return { success:true, status: 200, message: "User found", user: customer };
                }
                
        })

export const GetCustomerByEmail = action({
        args: { email: v.string() },
        handler: async (ctx, args): Promise<Response> => {
    // Call the registered query using ctx.runQuery
    const customer = await ctx.runQuery(api.users.GetCustomer, { email: args.email });

    if (!customer.user) {
      return { success: false, status: 404, message: "User not Found", user: null };
    }

    return { success: true, status: 200, message: "Success !", user: customer.user };
  },
});

export const GetCustomerByTokenAction = action({
        args: { token: v.string() },
        handler: async (ctx, args): Promise<Response> => {
    // Call the registered query using ctx.runQuery
    const customer = await ctx.runQuery(api.users.GetCustomerByToken, { token: args.token });

    if (!customer.user) {
      return { success: false, status: 404, message: "Token is Invalid", user: null };
    }

    return { success: true, status: 200, message: "Success !", user: customer.user };
  },
});
        
        export const GetCustomerById = query({
        args:{id: v.id("customers")},
              handler: async (ctx, args) => {
                     const Customer = await ctx.db.query("customers").filter((q)=> q.eq(q.field("_id"), args.id)).first() 
                    return Customer
                    },
                    })

export const GetAllCustomers = query({
              handler: async (ctx, ) => {
                     const Customers = await ctx.db.query("customers").collect() 
                    return Customers
                    },
                    })
        export const AuthenticateUser = action({
                args:{email:v.string(), password:v.string()},
                handler:async(ctx,args): Promise<Response>=>{
                        const user = await ctx.runQuery(api.users.GetCustomer, {
                                email: args.email,
                        });
                        if (!user) {
                               return { success:false ,status: 404,message: "User not Found",user };
                        }
                        
                        const isMatch = await bcrypt.compare(args.password, user.user?.passwordHash ?? "");
                        if (!isMatch) {
                          return { success:false ,status: 401,message: "Invalid Password",user:user.user };
                }
                   return { success:true ,status: 201,message: "Success",user:user.user };
}
})

      export const UpdateCustomer = mutation({
         args:{User:v.object({
                _id: v.id("customers"),
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
                _creationTime:v.optional(v.number()),
         })},handler:async(ctx,args)=>{
              if(args.User){
              const NewUser = await ctx.db.patch(args.User._id, {
                ...args.User,
                updatedAt: Date.now(),
              });
              return {succes:true, status: 20, message: "Success", user: NewUser};
              }
              
              
        }})