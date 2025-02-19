import React, { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { LogIn, Menu, ShoppingBag, X } from "lucide-react";
import { navItems } from "@/utils/constants";
import { useContext } from "react";
import { ProductContext } from "@/layout/RootLayout";
function Header() {
    const { user } = useSelector((state) => state.user);
    const cartItems = useSelector((state) => state.cart.items);
    const products = useContext(ProductContext);
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);
        if (query.length > 1) {
            const filteredProducts = products[0].filter((product) =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredProducts);
        } else {
            setSuggestions([]);
        }
    };

    const handleProductSelect = (productId) => {
        setSearchTerm("");
        setSuggestions([]);
        navigate(`/products/${productId}`);
    };

    return (
        <header className="flex z-20 items-center justify-between py-3 px-6 md:px-20 border-b border-secondary border-1 fixed left-0 right-0 top-0 bg-[#ffffff88] dark:bg-[#0000009e] backdrop-blur-lg">
            <NavLink to={navItems[0].path} className="text-3xl font-bold font-mono">
                EzShop
            </NavLink>

            {location.pathname !== "/cart" && ( // No Need Search On Cart
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="border p-2 rounded-md w-52 md:w-64"
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute left-0 w-full bg-white dark:bg-black border rounded-md mt-1 shadow-md z-50">
                            {suggestions.map((product) => (
                                <li
                                    key={product.id}
                                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                                    onClick={() => handleProductSelect(product.id)}
                                >
                                    {product.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

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
                            <Link to="/react-store/cart" className="relative" onClick={() => setMenuOpen(false)}>
                                <ShoppingBag className="w-5 h-5" />
                                <div className="absolute -top-2 -right-2 z-10 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartItems.length}
                                </div>
                            </Link>
                            {user.role === "admin" && <Link to="/admin" className="text-sm">Admin Dashboard</Link>}
                            <Link to="/react-store/profile" onClick={() => setMenuOpen(false)}>
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={user.image} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>
                        </div>
                    ) : (
                        <Button variant="secondary" onClick={() => setMenuOpen(false)}>
                            <LogIn />
                            <NavLink to="/auth/login">Login</NavLink>
                        </Button>
                    )}
                    <ModeToggle onClose={() => setMenuOpen(false)} />
                </div>
            </nav>
        </header>
    );
}

export default Header;
