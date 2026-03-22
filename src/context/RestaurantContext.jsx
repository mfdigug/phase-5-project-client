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

    const updateRestaurantStatus = async (id, status) => {

        const payload = { status };

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
            body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed");

        const updated = await res.json();
        setRestaurants(prev => 
            prev.map(r => (r.id === id ? updated : r))
        );
    };

    const addRestaurant = async (restaurantData) => {
        const res = await fetch("/api/restaurants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(restaurantData)
        });

        if (!res.ok) {
            const err = await res.json();
            console.error("Failed to add restaurant:", err);
            throw new Error("Failed to add restaurant")
        }

        const newRestaurant = await res.json();
        setRestaurants((prev) => [...prev, newRestaurant])
    }


    

   return (
        <RestaurantContext.Provider value={{
            restaurants,
            setRestaurants,
            updateRestaurantStatus,
            addRestaurant
        }}>
            {children}
        </RestaurantContext.Provider>
    );
}