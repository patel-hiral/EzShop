import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

function RootLayout() {
    return (
        <div>
            <Header />
            <main className='pt-20 sm:p-20'>
                <Outlet />
            </main>
        </div>
    )
}

export default RootLayout