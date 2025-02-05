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

export default function AuthProfile({ image }) {
    
    const { logout } = useContext(AuthContext);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="border border-secondary cursor-pointer">
                    <Avatar>
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
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Your Cart</SheetTitle>
                        <SheetDescription>
                            Here you can review items in your cart before checkout.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
}
