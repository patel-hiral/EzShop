import Product from '@/components/Product';
import React from 'react'
import { useLoaderData } from 'react-router-dom'
function Products() {
  const products = useLoaderData();
  console.log('Products::', products);

  return (
    <ul className='flex justify-evenly flex-wrap gap-5'>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <Product product={product} />
          </li>
        )
      })}
    </ul>
  )
}

export default Products

export async function getAllProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products')
    if (!response.ok) {
      return console.log('Failed to get data');
    }
    const resData = await response.json();
    return resData.products;
  } catch (error) {
    console.log('Error : ', error);
  }
}