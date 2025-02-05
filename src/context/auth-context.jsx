import { createContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "@/store/slices/userSlice";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const { user } = useSelector((state) => state.user);
    
    const cart = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);

    const { toast } = useToast();

    async function register(formData, navigate) {
        try {
            setLoading(true);
            const response = await fetch("https://dummyjson.com/users/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Registration failed");

            const data = await response.json();

            setLoading(false);
            toast({ title: "Success", description: "Account Created Successfully!" });
            if (navigate) navigate("/auth/login");
        } catch (error) {
            setLoading(false);
            toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
        }
    }

    async function getCart() {
        try {
            const response = await fetch('https://dummyjson.com/carts/user/' + userId)
            if (!response.ok) {
                return console.log('Error Fetching Cart Of User');
            }
            const cartData = await response.json();
            console.log(cartData);
            return cartData.products
        } catch (error) {
            console.log('error fetching cart data::', error);
        }
    }

    async function login({ username, password }, navigate) {
        try {
            setLoading(true);
            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, expiresInMins: 30 }),
            });

            if (!response.ok) {
                setLoading(false);
                return toast({ title: "Login Failed", description: "Invalid Credentials", variant: "destructive" });
            }

            const resData = await response.json();
            const accessToken = resData.accessToken;
            dispatch(loginAction(resData))

            localStorage.setItem("accessToken", accessToken);
            setLoading(false);
            toast({ title: "Login Success", description: `Welcome ${resData.firstName}` });
            navigate("/react-store/profile");
        } catch (error) {
            setLoading(false);
            toast({ title: "Error", description: error.message || "Login Failed...", variant: "destructive" });
        }
    }

    function logout() {
        dispatch(logoutAction())
        toast({ title: "Logged Out", description: "You have been successfully logged out." });
    }

    return (
        <AuthContext.Provider value={{ register, isLoading, login, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
