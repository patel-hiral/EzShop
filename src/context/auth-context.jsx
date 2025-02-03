import { createContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getAuthToken } from "@/utils/getAuthToken";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [isLoading, setLoading] = useState(false);

    const [token, setToken] = useState(() => localStorage.getItem('accessToken') || null);

    const { toast } = useToast();

    useEffect(() => {
        const authToken = getAuthToken();
        if (!authToken) {
            localStorage.removeItem('accessToken');
            setToken('');
        } else {
            setToken(authToken);
        }
    }, []);


    async function getAuthUser() {
        try {
            const response = await fetch('https://dummyjson.com/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                credentials: 'include'
            })
            if (!response.ok) {
                return console.log('Failed To Get User');
            }
            const resData = await response.json();
            return resData;
        } catch (error) {
            console.log('Error : ', error);
        }
    }



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

    async function login({ username, password }, navigate) {
        try {
            setLoading(true)
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password,
                    expiresInMins: 30,
                }),
            })

            if (!response.ok) {
                setLoading(false)
                return toast({
                    title: "Login Failed",
                    description: "Invalid Credentials",
                    variant: "destructive"
                });
            }

            const resData = await response.json()
            console.log(resData);
            navigate("/react-store/profile", { state: { userData: resData } })

            toast({
                title: resData && resData.message ? resData.message : 'Login Success',
                description: !resData.message && resData ? 'Welcome ' + resData.firstName : 'Invalid Credentials'
            });

            const accessToken = resData.accessToken;
            localStorage.setItem('accessToken', accessToken)
            setToken(accessToken)
            setLoading(false)

        } catch (error) {
            toast({
                title: "Error",
                description: error?.message || 'Login Failed...',
                variant: "destructive"
            });
        }
    }

    function logout() {
        localStorage.removeItem('accessToken')
        setToken(null)
        toast({
            title: "Logged Out"
        })
    }

    return (
        <AuthContext.Provider value={{ register, isLoading, login, token, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
