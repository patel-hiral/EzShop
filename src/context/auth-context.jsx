import { createContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
export const AuthContext = createContext();
import { setUser } from "@/store/authSlice";

export default function AuthProvider({ children }) {

    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);
    const [token, setToken] = useState(() => localStorage.getItem("accessToken") || null);
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

            dispatch(setUser(resData))
            setToken(accessToken);
            setLoading(false);

            toast({ title: "Login Success", description: `Welcome ${resData.firstName}` });
            navigate("/react-store/profile");

        } catch (error) {
            setLoading(false);
            toast({ title: "Error", description: error.message || "Login Failed...", variant: "destructive" });
        }
    }

    function logout() {
        localStorage.removeItem("persist:root");
        localStorage.removeItem("user");
        dispatch(setUser(null));
        dispatch(setToken(null));
        toast({ title: "Logged Out", description: "You have been successfully logged out." });
    }

    return (
        <AuthContext.Provider value={{ register, isLoading, login, token, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
