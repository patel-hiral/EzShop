import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

function Product({ product }) {
    return (
        <Card className="w-72 h-fit">
            <CardHeader>
                <img className='h-40 mx-auto' src={product.thumbnail} alt={product.title} />
                {product.title}
            </CardHeader>
            <CardContent>
                <p className='-mt-6 py-2 font-bold'>$ {product.price}&nbsp;&nbsp;<span className='text-sm line-through font-medium text-gray-500'>${(product.price + (product.price * product.discountPercentage) / 100).toFixed(2)}</span>&nbsp;&nbsp;<span className='text-xs text-green-600 font-semibold'>{product.discountPercentage}% off</span></p>
                <p className='text-xs text-gray-400'>{product.description}</p>
            </CardContent>
        </Card>
    )
}

export default Product