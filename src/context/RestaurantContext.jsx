import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"
import { apiFetch } from "../utils/api";

const RestaurantContext = createContext();

export const useRestaurants = () => useContext(RestaurantContext);

export const RestaurantProvider = ({ children }) => {
    const { user } = useAuth();
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        if (!user) return;

        const fetchMyRestaurants = async () => {
            try {
                const data = await apiFetch("/api/my_restaurants");
                setRestaurants(data);
            } catch (err) {
                console.error("Failed to fetch restaurants", err);
                setRestaurants([])
            }
        }

        fetchMyRestaurants();

    }, [user]);

    //add restaurant to users wish
    const addRestaurant = async (restaurantData) => {
        const newRestaurant = await apiFetch("/api/user_restaurants", {
            method: "POST",
            body: JSON.stringify({
                restaurant_id: place.google_place_id,
                status: "wishlist",
            }),
        });

        setRestaurants((prev) => [...prev, newRestaurant])
    }

    // update status/rating/notes
    const updateRestaurant = async (id, payload) => {
        const updated = await apiFetch(`/api/user_restaurants/${id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        });

        setRestaurants((prev) =>
            prev.map((r) => (r.id === id ? updated : r))
        );
    };

    // delete relationship
    const deleteRestaurant = async (id) => {
        await apiFetch(`/api/user_restaurants/${id}`, {
            method: "DELETE",
        });

        console.log("DELETE status:", res.status);

        setRestaurants(prev => prev.filter(r => r.id !== id));
    }


    

   return (
        <RestaurantContext.Provider value={{
            restaurants,
            setRestaurants,
            addRestaurant,
            updateRestaurant,
            deleteRestaurant
        }}>
            {children}
        </RestaurantContext.Provider>
    );
}