import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { AuthContext } from '@/context/auth-context'
import AuthProfile from './AuthProfile'

const navItems = [
    { id: "01", path: '/', title: "Home" },
    { id: "02", path: '/about', title: "About" },
    { id: "03", path: '/products', title: "Products" },
    { id: "04", path: '/contact', title: "Contact" },
    { id: "05", path: '/faq', title: "FAQ" },
]
function Header() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className='flex items-center justify-between py-4 px-20 border-b border-secondary border-1 fixed left-0 right-0 top-0 bg-white dark:bg-black'>
            <Link to={navItems[0].path} className='text-3xl'>React Store</Link>
            <nav className='flex gap-10'>
                <ul className='flex items-center gap-5'>
                    {navItems.map((item) =>
                        <Link to={item.path} className='dark:text-slate-300 text-sm' key={item.id}>{item.title}</Link>
                    )}
                </ul>
                <div className="auth-section flex items-center gap-8">
                    {user ? (
                        <AuthProfile image={user.image} />
                    ) : (
                        <Button variant="secondary">
                            <Link to="/auth/login">Login</Link>
                        </Button>
                    )}
                    <ModeToggle />
                </div>
            </nav>
        </div>
    )
}

export default Header