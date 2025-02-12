import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { createContext } from 'react'
import { useLoaderData } from 'react-router-dom'

export const ProductContext = createContext([])

function RootLayout() {
    const products = useLoaderData();
    return (
        <ProductContext.Provider value={[products]}>
            <Header />
            <main className='pt-16 sm:px-20 sm:pt-20 '>
                <Outlet />
            </main>
        </ProductContext.Provider>
    )
}

export default RootLayout