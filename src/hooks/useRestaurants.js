import { useState, useEffect } from "react";

export const useRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        fetch("/api/restaurants")
        .then((res) => res.json())
        .then((data) => {
            setRestaurants(data)
        });
    }, []);

    return { restaurants, setRestaurants };
}
