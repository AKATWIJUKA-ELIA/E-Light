import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import getImageUrl from "../../convex/_generated/api"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
