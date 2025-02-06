import CartItem from '@/components/CartItem'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function CheckOut() {
    const cartItems = useSelector((state) => state.cart.items)
    const navigate = useNavigate();
    useEffect(() => {
        if (cartItems.length <= 0) {
            navigate("/products")
        }
    }, [cartItems])

    return (
        <div>
            {cartItems.map((item) => {
                return (
                    <CartItem item={item} key={item.id} />
                )
            })}
            <div className='py-2 flex items-center justify-between'>
                <p>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                <Button>Confirm Order</Button>
            </div>

        </div>
    )
}

export default CheckOut