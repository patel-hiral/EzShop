import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from './ui/card'
import { Button } from './ui/button'

function Product({ product }) {
    return (
        <Card className="w-60 h-fit">
            <CardHeader>{product.title}</CardHeader>
            <CardContent>
                <img className='h-40 mx-auto' src={product.thumbnail
                } alt={product.title} />
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="ghost">$ {product.price}</Button>
                <Button>Buy Now</Button>
            </CardFooter>
        </Card>
    )
}

export default Product