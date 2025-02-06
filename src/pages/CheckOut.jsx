import React from 'react'

function CheckOut({ onClose }) {
    return (
        <modal className='h-screen flex items-center justify-center'>
            <div className="card w-[350px] h-[350px] flex items-center justify-center bg-green-700">
                <h1 className='text-center text-6xl'>Order Placed Successfully...</h1>
                <p className='text-center text-4xl'>Thank you for shopping with us</p>
            </div>
            <button onClick={onclose}>Close</button>
        </modal>
    )
}

export default CheckOut