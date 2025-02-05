import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

function CartItem(product) {
    return (
        <Card>
            <CardHeader className="flex gap-4">
                <img src={product.thumbnail} alt={product.title} />
                <CardTitle>{product.title}</CardTitle>
            </CardHeader>
        </Card>
    )
}

export default CartItem