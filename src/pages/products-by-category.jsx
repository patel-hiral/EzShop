import React from 'react'
import Product from '@/components/product'
import { useLoaderData } from 'react-router-dom'
import { Link } from 'react-router-dom'
function ProductsByCategory() {

    const { products } = useLoaderData()

    return (
        <ul className='flex justify-center md:justify-center flex-wrap gap-5'>
            {products.map((product) => {
                return (
                    <Link to={`/cat/${product.id}`} key={product.id}>
                        <Product product={product} />
                    </Link>
                )
            })}
        </ul>
    )
}

export default ProductsByCategory

export async function getProductsBycategory({ params }) {
    const category = params.category;

    const res = await fetch(`https://dummyjson.com/products/category/${category}`)
    if (!res.ok) {
        return console.log('Failed to get data');
    }
    const data = await res.json()
    return data;
}