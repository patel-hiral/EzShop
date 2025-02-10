import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import AuthProfile from "./AuthProfile";
import { useSelector } from "react-redux";
import { LogIn, Menu, ShoppingBag,  X } from "lucide-react";


const navItems = [
    { id: "01", path: "/", title: "" },
    { id: "02", path: "/products", title: "Products" },
    { id: "03", path: "/about", title: "About" },
    { id: "04", path: "/contact", title: "Contact" },
    { id: "05", path: "/faq", title: "FAQ" },
];

function Header() {
    const { user } = useSelector((state) => state.user);
    const cartItems = useSelector((state) => state.cart.items);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="flex z-20 items-center justify-between py-3 px-6 md:px-20 border-b border-secondary border-1 fixed left-0 right-0 top-0 bg-[#ffffff88] dark:bg-[#0000009e] backdrop-blur-md">
            <NavLink to={navItems[0].path} className="text-3xl font-bold font-mono">
                EzStore
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
                        <p className="flex items-center gap-5">
                            <Link to="/react-store/cart" className="relative">
                                <ShoppingBag className="w-5 h-5" />
                                <div className="absolute -top-2 -right-2 z-10 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartItems.length}
                                </div>
                            </Link>
                            <AuthProfile image={user.image} />
                        </p>
                    ) : (
                        <Button variant="secondary" onClick={() => setMenuOpen(false)}>
                            <LogIn/><NavLink to="/auth/login">Login</NavLink>
                        </Button>
                    )}
                    <ModeToggle />
                </div>
            </nav>
        </header>
    );
}

export default Header;
