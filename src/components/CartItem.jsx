import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Minus, Plus } from 'lucide-react'

function CartItem(product) {
    return (
        <Card>
            <CardHeader className="flex gap-4">
                <img src={product.thumbnail} alt={product.title} />
                <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-sm"> {product.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex gap-4">
                <Plus />{product.quantity}<Minus />
            </CardFooter>
        </Card>
    )
}

export default CartItem