import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getFirstTwoCharacters=(string:string) =>{
  if (string && string.length >= 2) {
    return string.substring(0, 2).toUpperCase();
  } else {
    return null;
  }
}