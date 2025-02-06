import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

export default function AuthProfile({ image }) {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const { logout } = useContext(AuthContext);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    function handleCheckOut() {
        setIsSheetOpen(false)
        navigate("/react-store/checkout")
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    asChild
                    className="border border-secondary cursor-pointer"
                >
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={image} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-40">
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
                        <Button variant="outline" onClick={() => logout()}>
                            Logout
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Sheet for Cart */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="overflow-y-auto min-w-96">
                    <SheetHeader>
                        <SheetTitle>Your Cart</SheetTitle>
                        <SheetDescription>
                            {cartItems.length <= 0 &&
                                "Cart is Empty right now. Add some products to cart."}
                        </SheetDescription>
                        <SheetDescription>
                            {cartItems.length > 0 && (
                                <span>Total Items: {cartItems.length}</span>
                            )}
                        </SheetDescription>
                    </SheetHeader>
                    {cartItems.map((item) => {
                        return <CartItem item={item} key={item.id} />;
                    })}
                    {cartItems.length > 0 &&
                        <Button onClick={handleCheckOut} variant="secondary" className="my-2">Check Out</Button>
                    }
                </SheetContent>
            </Sheet>
        </>
    );
}
