import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Id } from "../../convex/_generated/dataModel"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Product {
        _id: Id<"products">,
        approved: boolean,
        product_cartegory: string,
        product_condition: string,
        product_description: string,
        product_image: string[],
        product_name: string,
        product_owner_id: string,
        product_price: string,
        product_embeddings?: number[],
        product_image_embeddings?: number[],
        product_likes?: number,
        product_views?: number,
        product_sponsorship?: {
                type?: "basic" | "premium" | "elite",
                duration?: number,
                status?: "active" | "expired"
        }
        _creationTime: number
}
export interface User {
        _id: Id<"customers">,
        username: string,
        email: string,
        passwordHash: string,
        phoneNumber?: string,
        profilePicture?: string,
        isVerified: boolean | false,
        role: string|"",
        reset_token?:string
        reset_token_expires:number,
        updatedAt: number,
        lastLogin?: number,
        _creationTime:number,
}
export interface Bookmark {
        _id?: Id<"bookmarks">,
        product_id?: string,
        user_id?: string,
        _creationTime?: number,
        product?: {
                approved: boolean;
                product_cartegory: string;
                product_condition: string;
                product_description: string;
                product_image: string[];
                product_name: string;
                product_owner_id: string;
                product_price: string;
                _creationTime: number;
                _id: string;
  }|null;
}
export interface Boost {
        product_id: Id<"products">,
        boost_type: "premium" | "basic" | "platinum",
        duration: string,
        status: "active" | "expired" | undefined
}
export interface Interaction{
          user_id: string
          product_id: string
          count:number
          type:  {
                  view:{
                          count:number
                  },
                  cart:{
                          count:number
                  }
            },
}
export interface BoostWithInteraction extends Product {
        interaction?: Interaction
}