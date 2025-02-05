import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import AuthProfile from "./AuthProfile";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";

const navItems = [
    { id: "01", path: "/", title: "Home" },
    { id: "02", path: "/about", title: "About" },
    { id: "03", path: "/products", title: "Products" },
    { id: "04", path: "/contact", title: "Contact" },
    { id: "05", path: "/faq", title: "FAQ" },
];

function Header() {
    const { user } = useSelector((state) => state.user);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="flex z-20 items-center justify-between py-2 px-6 md:px-20 border-b border-secondary border-1 fixed left-0 right-0 top-0 bg-[#ffffff88] dark:bg-[#0000009e] backdrop-blur-md">
            <NavLink to={navItems[0].path} className="text-3xl font-medium font-mono">
                <img src="/bug-store.png" alt="BugStore" className="max-h-12" />
            </NavLink>

            <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>
            <nav className={`absolute md:static top-16 left-0 w-full md:w-auto md:bg-transparent md:flex md:items-center md:gap-10 transition-transform ${menuOpen ? "block" : "hidden"}`}>
                <ul className="flex flex-col md:flex-row items-center gap-5 p-5 md:p-0">
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
                        <AuthProfile image={user.image} />
                    ) : (
                        <Button variant="secondary" onClick={() => setMenuOpen(false)}>
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
