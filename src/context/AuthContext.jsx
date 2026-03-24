import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const login = async (email, password) => {
        const res = await fetch("/api/login", {
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
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(userData),
        });

        if (!res.ok) throw new Error("Register failed");

        const data = await res.json();
        console.log(data)
        setUser(data);
    };
    
    const logout = async () => {
        await fetch("/api/logout",{
            method: "DELETE",
            credentials: "include",
        });
        setUser(null);
    }

    useEffect(() => {
        const checkSession = async () => {
            try {
            const res = await fetch("/api/check_session", { credentials: "include" });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch (err) {
            console.log("No active session", err);
        }
     };
      checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )

}