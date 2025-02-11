import Header from '@/components/header'
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function ProtectedRoutes() {
    const { user } = useSelector((state) => state.user)
    return user ?
        <React.Fragment>
            <Header />
            <Outlet />
        </React.Fragment>
        : <Navigate to="/auth/login" />
}

export default ProtectedRoutes
