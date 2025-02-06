import { MinusIcon, PlusIcon } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart, addToCart } from '@/store/slices/cartSlice'
function CartItem({ item }) {
    const dispatch = useDispatch();
    return (
        <div key={item.id} className="flex items-center justify-between py-2 border-b border-secondary w-full">
            <img src={item.thumbnail} alt={item.name} className="w-12 h-12" />
            <div className="flex-1 px-4">
                <h1 className="text-sm">{item.title}</h1>
                {item.quantity > 1 && <p className="text-xs text-gray-500">Quantity:{item.quantity}</p>}

                <p className="text-xs text-gray-500">Total: $ {(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <p className="text-sm font-semibold pr-4">${item.price}</p>
            <div className="cart-controller flex items-center gap-3">
                <button onClick={() => { dispatch(removeFromCart(item.id)) }} className="w-fit p-1 rounded-lg border border-secondary">
                    <MinusIcon />
                </button>
                {item.quantity}
                <button onClick={() => { dispatch(addToCart(item)) }} className="w-fit p-1 rounded-lg border border-secondary">
                    <PlusIcon />
                </button>
            </div>
        </div>
    )
}

export default CartItem