import { useContext } from "react";
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

export default function AuthProfile({ image }) {
    const { logout } = useContext(AuthContext);
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
                        <DropdownMenuItem>
                            <Link to="/react-store/orders">Orders</Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                        <Button variant="outline" onClick={() => logout()}>
                            Logout
                        </Button>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
