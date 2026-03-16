import { useState, useEffect } from "react";

export const useRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        fetch("/api/restaurants")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setRestaurants(data)
        });
    }, []);

    return { restaurants, setRestaurants };
}