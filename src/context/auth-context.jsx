import { createContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isLoading, setLoading] = useState(false);

    const { toast } = useToast();

    async function register(formData, navigate) {
        try {
            setLoading(true);
            const response = await fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                console.error('Failed to register user');
                throw new Error("Registration failed");
            }

            const data = await response.json();
            console.log('New User:', data);
            setLoading(false)
            toast({
                title: "Success",
                description: 'Account Created Successfully!'
            });
            if (navigate) navigate('/auth/login');
        } catch (error) {
            console.error("Error Registering User:", error);
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive"
            });
        }
    };

    async function login({ email, password }, navigate) {
        try {
            setLoading(true)
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: email,
                    password: password,
                    expiresInMins: 30,
                }),
                credentials: 'include'
            })
            if (!response.ok) {
                toast({
                    title: "Error",
                    description: "Something went wrong. Please try again.",
                    variant: "destructive"
                });
            }
            const resData = await response.json()
            console.log(resData);
            toast({
                title: "Success",
                description: 'Account Created Successfully!'
            });
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error",
                description: error?.message || 'Login Failed...',
                variant: "destructive"
            });
        }
    }
    
    return (
        <AuthContext.Provider value={{ register, isLoading, login }}>
            {children}
        </AuthContext.Provider>
    );
}
