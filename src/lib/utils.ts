import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Id } from "../../convex/_generated/dataModel"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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