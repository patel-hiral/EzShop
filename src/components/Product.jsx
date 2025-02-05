import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { StarIcon } from 'lucide-react'

function Product({ product }) {
    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };
    return (
        <Card className="w-72 h-fit">
            <CardHeader className="-mb-5">
                <img className='h-40 mx-auto' src={product.thumbnail} alt={product.title} />
                <span className='w-fit text-base text-gray-400' variant="secondary">{product.brand ? product.brand : ''}</span>
                <span className='text-sm'>{product.title}</span>
            </CardHeader>
            <CardContent>
                <p className='flex items-center'> <span className="bg-green-500 py-[2px] text-white text-xs items-center px-1 rounded-sm flex w-fit font-semibold">{product.rating}<StarIcon className='h-4' /></span>&nbsp; <span className='text-sm text-gray-500'>({product.reviews.length})</span></p>
                <p className=' py-2 font-bold'>$ {product.price}&nbsp;&nbsp;<span className='text-sm line-through font-medium text-gray-500'>${(product.price + (product.price * product.discountPercentage) / 100).toFixed(2)}</span>&nbsp;&nbsp;<span className='text-xs text-green-600 font-semibold'>{product.discountPercentage}% off</span></p>
                <p className='text-xs text-gray-400'>{truncateText(product.description, 12)}</p>
            </CardContent>
        </Card>
    )
}

export default Product