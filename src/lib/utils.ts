import { FE_ORIGIN } from "@/config"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const withToken = async (func) => {
//   return await chrome.cookies.get({ url: FE_ORIGIN, name: 'token' },
//     async (cookie) => {
//       if (!cookie) {
//         console.log('no token')
//         return false
//       }
//       return await func(cookie)
//     }
//   )
// }