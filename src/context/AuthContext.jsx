import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isChecking, setIsChecking] = useState(true);


    const login = async (email, password) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error("Login failed");
        const data = await res.json();
        setUser(data);
        return data
    };

    const register = async (userData) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(userData),
            });

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            setUser(data);
    }

    
    const logout = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/api/logout`,{
            method: "DELETE",
            credentials: "include",
        });
        setUser(null);
    }

    useEffect(() => {
        const checkSession = async () => {
            try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/check_session`, { credentials: "include" });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch (err) {
            console.log("No active session", err);
        } finally {
            setIsChecking(false)
        }
     };
      checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isChecking }}>
            {children}
        </AuthContext.Provider>
    )

}