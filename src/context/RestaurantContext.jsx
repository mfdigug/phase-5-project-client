import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"

const RestaurantContext = createContext();

export const useRestaurants = () => useContext(RestaurantContext);

export const RestaurantProvider = ({ children }) => {
    const { user } = useAuth();
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        if (!user) return;

        const fetchMyRestaurants = async () => {
            try {
                const res = await fetch("/api/my_restaurants",{credentials: "include"});
                if (res.ok) {
                    const data = await res.json();
                    setRestaurants(data);
                } else {
                    setRestaurants ([])
                }
            } catch (err) {
                console.error("Failed to fetch restaurants", err);
                setRestaurants([])
            }
        }

        fetchMyRestaurants();

    }, [user]);

    const markAsTried = async (id) => {

        const payload = { status: "tried" };

        console.log("Sending PATCH request:", {
            id,
            payload
        });

        const res = await fetch(`/api/restaurants/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({status: "tried"}),
        });

        if (!res.ok) throw new Error("Failed");

        const updated = await res.json();
        setRestaurants(prev => prev.map(r => r.id === id ?updated : r));
    };

   return (
        <RestaurantContext.Provider value={{
            restaurants,
            setRestaurants,
            markAsTried
        }}>
            {children}
        </RestaurantContext.Provider>
    );
}