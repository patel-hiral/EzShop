import { createContext, useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "@/store/slices/userSlice";
import { fetchProducts } from "@/utils/constants";

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

    async function getAuthUser(id) {
        const response = await fetch('https://dummyjson.com/users/' + id);
        if (!response.ok) {
            console.log('Failed To Get User Details');
        }
        const userData = await response.json();
        return userData
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
            localStorage.setItem("accessToken", accessToken);

            const newUser = await getAuthUser(resData.id);

            dispatch(loginAction(newUser))

            setLoading(false);

            toast({ title: "Login Success", description: `Welcome ${resData.firstName}` });
            navigate("/products");
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
