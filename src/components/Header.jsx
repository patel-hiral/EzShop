import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { LogIn, Menu, ShoppingBag, X } from "lucide-react";
import { navItems } from "@/utils/constants";

function Header() {
    
    const { user } = useSelector((state) => state.user);
    const cartItems = useSelector((state) => state.cart.items);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="flex z-20 items-center justify-between py-3 px-6 md:px-20 border-b border-secondary border-1 fixed left-0 right-0 top-0 bg-[#ffffff88] dark:bg-[#0000009e] backdrop-blur-lg">
            <NavLink to={navItems[0].path} className="text-3xl font-bold font-mono">
                EzShop
            </NavLink>

            <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>
            <nav className={`absolute md:static top-16 bg-white dark:bg-black md:dark:bg-transparent left-0 w-full md:w-auto md:bg-transparent md:flex md:items-center md:gap-10 transition-transform ${menuOpen ? "block" : "hidden"}`}>
                <ul className="flex flex-col font-semibold md:flex-row items-center gap-5 p-5 md:p-0">
                    {navItems.map((item) => (
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `dark:text-slate-300 text-sm ${isActive ? "text-indigo-600 dark:text-indigo-600" : ""}`
                            }
                            key={item.id}
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.title}
                        </NavLink>
                    ))}
                </ul>
                <div className="auth-section flex flex-col md:flex-row items-center gap-5 md:gap-8 p-5 md:p-0">
                    {user ? (
                        <div className="flex items-center gap-5">
                            <Link to="/react-store/cart" className="relative" onClick={() => setMenuOpen(false)}
                            >
                                <ShoppingBag className="w-5 h-5" />
                                <div className="absolute -top-2 -right-2 z-10 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartItems.length}
                                </div>
                            </Link>
                            {user.role === 'admin' && <Link to="/admin" className="text-sm">Admin Dashboard</Link>}
                            <Link to="/react-store/profile" onClick={() => setMenuOpen(false)}
                            >
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={user.image} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>
                        </div>
                    ) : (
                        <Button variant="secondary" onClick={() => setMenuOpen(false)}>
                            <LogIn /><NavLink to="/auth/login">Login</NavLink>
                        </Button>
                    )}
                    <ModeToggle onClose={() => setMenuOpen(false)}
                    />
                </div>
            </nav>
        </header>
    );
}

export default Header;
