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
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/my_restaurants`, {credentials: "include"});
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

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/restaurants/${id}`, {
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

    const rateRestaurant = async (id, rating) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/restaurants/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ rating }),
        });

        if (!res.ok) throw new Error("Failed to rate restaurant");

        const updated = await res.json();

        setRestaurants(prev => 
            prev.map(r => (r.id === id ? updated : r))
        )
    }

    const addRestaurant = async (restaurantData) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/restaurants`, {
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


    const deleteRestaurant = async (id) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/restaurants/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        console.log("DELETE status:", res.status);

        if (!res.ok) {
            const text = await res.text();
            console.error("DELETE failed:", text)
            throw new Error("Failed to delete restaurant");
        } 


        setRestaurants(prev => prev.filter(r => r.id !== id));
    }


    

   return (
        <RestaurantContext.Provider value={{
            restaurants,
            setRestaurants,
            updateRestaurantStatus,
            rateRestaurant,
            addRestaurant,
            deleteRestaurant
        }}>
            {children}
        </RestaurantContext.Provider>
    );
}