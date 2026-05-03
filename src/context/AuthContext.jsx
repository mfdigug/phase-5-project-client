import { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isChecking, setIsChecking] = useState(true);


    const login = async (email, password) => {
        const data = await apiFetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        setUser(data);
        return data
    };

    const register = async (userData) => {
        const data = await apiFetch("/api/register", {
                method: "POST",
                body: JSON.stringify(userData),
            });

            setUser(data);
            return data;
    }

    
    const logout = async () => {
        await apiFetch("/api/logout",{
            method: "DELETE",
            credentials: "include",
        });
        setUser(null);
    }

    useEffect(() => {
        const checkSession = async () => {
            try {
            const data = await apiFetch("/api/check_session");
            setUser(data);
            } catch (err) {
                setUser(null);
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