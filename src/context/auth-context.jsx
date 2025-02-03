import { createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const register = async (formData, navigate) => {
        try {
            const response = await fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formData
                })
            })
            if (!response.ok) {
                console.log('Failed to register user');

            }
            const data = await response.json()
            console.log('New User', data);
            navigate('/auth/login');
        } catch (error) {
            console.log("Error Registering User");
        }
    }

    const auth = {
        register
    }

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}