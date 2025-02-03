import Header from '@/components/Header'
import { AuthContext } from '@/context/auth-context'
import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function ProtectedRoutes() {
    const { token } = useContext(AuthContext)
    return token ?
        <>
            <Header />
            <Outlet />
        </>
        : <Navigate to="/auth/login" />
}

export default ProtectedRoutes
