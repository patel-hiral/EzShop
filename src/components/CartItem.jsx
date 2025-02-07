import { MinusIcon, PlusIcon } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart, addToCart } from '@/store/slices/cartSlice'
function CartItem({ item }) {
    const dispatch = useDispatch();
    return (
        <div key={item.id} className="flex items-center justify-between py-2 w-full px-2">
            <img src={item.thumbnail} alt={item.name} className="w-24 h-24" />
            <div className="flex-1 px-4">
                <h1 className="text-lg">{item.title}</h1>
                <p className="text-xs text-gray-500">Total: $ {(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <p className="text-sm font-semibold pr-4">${item.price}</p>
            <div className="cart-controller flex items-center gap-3">
                <button onClick={() => { dispatch(removeFromCart(item.id)) }} className="rounded-full p-1 shadow border border-secondary">
                    <MinusIcon className='h-5 w-5'/>
                </button>
                <p className='px-4 py-1 border border-secondary'>
                {item.quantity}
                </p>
                <button onClick={() => { dispatch(addToCart(item)) }} className="rounded-full border p-1 shadow border-secondary">
                    <PlusIcon className='h-5 w-5'/>
                </button>
            </div>
        </div>
    )
}

export default CartItem