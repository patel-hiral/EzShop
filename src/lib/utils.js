import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


async function getCart() {
  try {
      const response = await fetch('https://dummyjson.com/carts/user/' + user.id)
      if (!response.ok) {
          return console.log('Error Fetching Cart Of User');
      }
      console.log('Called Cart');
      
      const cartData = await response.json();
      console.log(cartData);
  } catch (error) {
      console.log('error fetching cart data::', error);
  }
}