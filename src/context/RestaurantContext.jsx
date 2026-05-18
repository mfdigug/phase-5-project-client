import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"
import { apiFetch } from "../utils/api";

const RestaurantContext = createContext();

export const useRestaurants = () => useContext(RestaurantContext);

export const RestaurantProvider = ({ children }) => {
    const { user } = useAuth();
    const [userRestaurants, setUserRestaurants] = useState([])

    useEffect(() => {
        if (!user) return;

        const fetchMyRestaurants = async () => {
            try {
                const data = await apiFetch("/api/my_restaurants");
                console.log("user restaurants:", data.user_restaurants)
                setUserRestaurants(data);
            } catch (err) {
                console.error("Failed to fetch restaurants", err);
                setUserRestaurants([])
            }
        }

        fetchMyRestaurants();

    }, [user]);

    //add restaurant to users wish
    const addRestaurant = async (restaurantId, status = "wishlist") => {
    const newUserRestaurant = await apiFetch("/api/user_restaurants", {
        method: "POST",
        body: JSON.stringify({
            restaurant_id: restaurantId,
            status
        }),
    });

    // update state
    setUserRestaurants((prev) => [...prev, newUserRestaurant]);

    return newUserRestaurant; // useful for chaining/navigation
};

    // update status/rating/notes
    const updateRestaurant = async (id, payload) => {
        const updated = await apiFetch(`/api/user_restaurants/${id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        });

        setUserRestaurants((prev) =>
            prev.map((r) => (r.id === id ? updated : r))
        );
    };

    // delete relationship
    const deleteRestaurant = async (id) => {
        await apiFetch(`/api/user_restaurants/${id}`, {
            method: "DELETE",
        });

        console.log("DELETE status:", res.status);

        setUserRestaurants(prev => prev.filter(r => r.id !== id));
    }


    

   return (
        <RestaurantContext.Provider value={{
            userRestaurants,
            setUserRestaurants,
            addRestaurant,
            updateRestaurant,
            deleteRestaurant
        }}>
            {children}
        </RestaurantContext.Provider>
    );
}