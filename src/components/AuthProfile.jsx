import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useContext } from "react"
import { AuthContext } from "@/context/auth-context"
import { Link } from "react-router-dom"

export default function AuthProfile({ image }) {
    const { logout } = useContext(AuthContext)
    return (
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
                    <DropdownMenuItem>
                        <Link to="/react-store/cart">My Cart</Link>
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
                <DropdownMenuSeparator />
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button variant="outline" onClick={() => logout()}>Logout</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
