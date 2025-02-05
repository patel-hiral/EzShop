import React from 'react'
import { useParams } from 'react-router-dom'

function ProductDetails() {
    const { id } = useParams();
    console.log(id);
    return (
        <div>ProductDetails of id: {id}</div>
    )
}

export default ProductDetails