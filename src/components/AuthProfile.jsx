import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useSelector } from "react-redux";

export default function AuthProfile({ image }) {

    const cartItems = useSelector((state) => state.cart.items);

    const { logout } = useContext(AuthContext);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="border border-secondary cursor-pointer">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={image} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link to="/react-store/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsSheetOpen(true)}>
                            My Cart
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to="/react-store/orders">My Orders</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Button variant="outline" onClick={() => logout()}>Logout</Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Sheet for Cart */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Your Cart</SheetTitle>
                        <SheetDescription>
                            {cartItems.length < 0 &&'Cart is Empty right now. Add some products to cart.'}
                        </SheetDescription>

                        <SheetDescription>
                            Total Items: {cartItems.length}
                        </SheetDescription>
                        </SheetHeader>

                     {cartItems.map((item)=>{
                            return (
                                <div key={item.id} className="flex items-center justify-between py-2 border-b border-secondary">
                                    <img src={item.thumbnail} alt={item.name} className="w-12 h-12" />
                                    <div className="flex-1 px-2">
                                        <h1 className="text-sm">{item.title}</h1>
                                        <p className="text-xs text-gray-500">{item.price}</p>
                                    </div>
                                    <p className="text-sm font-semibold">${item.price}</p>
                                </div>
                            )   
                     })}
                </SheetContent>
            </Sheet>
        </>
    );
}
