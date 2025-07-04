import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const trimString = (text: string, containerBounds:number, textBounds: number) => {
  const length: number = text.length
  const widthPerChar: number = 10
  const characters: number = textBounds / widthPerChar
   if (length < characters) return text;

  return text.substring(0, characters) + "..."
}
