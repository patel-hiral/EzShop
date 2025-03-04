import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, Navigate, Link, redirect } from "react-router-dom";
import {
    Home,
    Menu,
    Package,
    Package2,
    Search,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { ModeToggle } from "../components/ModeToggle";

function AdminLayout() {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const user = useSelector((state) => state.user.user);

    if (!user || user.role !== 'admin') {
        toast({ title: "Unauthorized", description: "Only Admin Can Access This Route" })
        return <Navigate to="/" />;
    }
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setIsSheetOpen(false);
    }, [location.pathname]);

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <NavLink to="/admin" className="flex items-center gap-2 font-semibold">
                            <Package2 className="h-6 w-6" />
                            <div className="h-6 text-xl font-bold">
                                EzShop - Admin
                            </div>
                        </NavLink>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <NavLink
                                to="/admin"
                                end
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive ? "bg-muted text-primary" : "text-muted-foreground"
                                    }`
                                }
                            >
                                <Home className="h-4 w-4" />
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/admin/products"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive ? "bg-muted text-primary" : "text-muted-foreground"
                                    }`
                                }
                            >
                                <Package className="h-4 w-4" />
                                Manage Products
                            </NavLink>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <NavLink
                                    to="/admin"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Package2 className="h-6 w-6" />
                                    <span className="sr-only">EzShop - Admin</span>
                                </NavLink>
                                <NavLink
                                    to="/admin"
                                    className={({ isActive }) =>
                                        `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all hover:text-foreground ${isActive
                                            ? "bg-muted text-foreground"
                                            : "text-muted-foreground"
                                        }`
                                    }
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    to="/admin/products"
                                    className={({ isActive }) =>
                                        `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all hover:text-foreground ${isActive
                                            ? "bg-muted text-foreground"
                                            : "text-muted-foreground"
                                        }`
                                    }
                                >
                                    <Package className="h-5 w-5" />
                                    Manage Products
                                </NavLink>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    {location.pathname === "/admin/products" && (
                        <div className="w-full flex-1">
                            <form>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search products..."
                                        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                    <div className="flex-1"></div>
                    <ModeToggle />
                    <Link to="/react-store/profile" variant="secondary" size="icon" className="rounded-full h-8 w-8 overflow-hidden shadow-sm border border-secondary">
                        <img src={user.image} className="h-full w-full object-contain" />
                        <span className="sr-only">Toggle user menu</span>
                    </Link>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-4 max-h-screen overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
