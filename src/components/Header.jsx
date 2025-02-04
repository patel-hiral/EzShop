import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { AuthContext } from "@/context/auth-context";
import AuthProfile from "./AuthProfile";

const navItems = [
    { id: "01", path: "/", title: "Home" },
    { id: "02", path: "/about", title: "About" },
    { id: "03", path: "/products", title: "Products" },
    { id: "04", path: "/contact", title: "Contact" },
    { id: "05", path: "/faq", title: "FAQ" },
];
import { useSelector } from "react-redux";
function Header() {
    const { user, logout } = useSelector((state) => state.auth);
    console.log('User Data::', user);
    return (
        <header className="flex z-20 items-center justify-between py-2 px-20 border-b border-secondary border-1 fixed left-0 right-0 top-0 bg-[#ffffff88] dark:bg-[#0000009e] backdrop-blur-md">
            <NavLink to={navItems[0].path} className="text-3xl font-medium font-mono">
                <img src="/bug-store.png" alt="BugStore" className="max-h-12" />
            </NavLink>
            <nav className="flex gap-10">
                <ul className="flex items-center gap-5">
                    {navItems.map((item) => (
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `dark:text-slate-300 text-sm ${isActive ? "text-indigo-600 dark:text-indigo-600" : ""
                                }`
                            }
                            key={item.id}
                        >
                            {item.title}
                        </NavLink>
                    ))}
                </ul>
                <div className="auth-section flex items-center gap-8">
                    {user ? (
                        <AuthProfile image={user.image} />
                    ) : (
                        <Button variant="secondary">
                            <NavLink to="/auth/login">Login</NavLink>
                        </Button>
                    )}
                    <ModeToggle />
                </div>
            </nav>
        </header>
    );
}

export default Header;
