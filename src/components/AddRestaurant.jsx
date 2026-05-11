import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRestaurants } from "../context/RestaurantContext";
import { apiFetch } from "../utils/api";

const AddRestaurant = () => {
    const navigate = useNavigate();
    const { addRestaurant } = useRestaurants();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔍 AUTOCOMPLETE (step 1)
    const searchPlaces = async (text) => {
        if (!text || text.trim().length < 2) {
            setResults([]);
            return;
        }

        setLoading(true);

        try {
            const data = await apiFetch(
                `/api/autocomplete?input=${encodeURIComponent(text)}`
            );

            setResults(data.results || []);
        } catch (err) {
            console.error("Autocomplete error:", err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    // ⏱ debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
            searchPlaces(query);
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

    // ➕ SELECT FLOW (steps 2 → 4)
    const handleSelect = async (place) => {
        try {
            // 1. Fetch full Google place details
            const details = await apiFetch(`/api/place/${place.place_id}`);

            const lat = details.location?.latitude;
            const lng = details.location?.longitude;

            // 2. Create or fetch canonical restaurant
            const restaurant = await apiFetch(`/api/restaurants`, {
                method: "POST",
                body: JSON.stringify({
                    google_place_id: details.id,
                    name: details.name,
                    address: details.address,
                    lat,
                    lng,
                    rating: details.rating,
                    website: details.website,
                    price_level: details.priceLevel,
                    cuisine_override: null
                })
            });

            // 3. Add to user wishlist (UserRestaurant layer)
            await apiFetch(`/api/user_restaurants`, {
                method: "POST",
                body: JSON.stringify({
                    restaurant_id: restaurant.id,
                    status: "wishlist"
                })
            });

            // 4. UI updates
            setSelected(details);
            setQuery("");
            setResults([]);

        } catch (err) {
            console.error("Failed to add restaurant:", err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-6 space-y-5 font-opensans">

            {/* HEADER */}
            <div className="
                bg-gradient-to-br from-slate-700/60 to-slate-900/80
                p-5 rounded-xl shadow-[0_3px_6px_rgba(237,145,158,0.18),0_8px_20px_rgba(237,145,158,0.25)]
            ">
                <h2 className="text-2xl font-semibold font-antic tracking-wider text-slate-300">
                    Add a Restaurant
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                    Start typing to search for a restaurant
                </p>
            </div>

            {/* SEARCH */}
            <div className="
                bg-gradient-to-br from-slate-700/60 to-slate-900/80
                p-4 rounded-xl shadow-[0_3px_6px_rgba(237,145,158,0.18),0_8px_20px_rgba(237,145,158,0.25)]
            ">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search restaurant name..."
                    className="
                        w-full px-3 py-2 rounded-lg
                        bg-slate-800/60 text-slate-200
                        border border-slate-600
                        focus:outline-none focus:ring-2 focus:ring-[#EFE4D8]/40
                    "
                />

                {loading && (
                    <p className="text-xs text-slate-400 mt-2">
                        Searching...
                    </p>
                )}

                {/* RESULTS */}
                {results.length > 0 && (
                    <div className="mt-3 max-h-64 overflow-y-auto rounded-lg border border-slate-600">
                        {results.map((place) => (
                            <div
                                key={place.place_id}
                                onClick={() => handleSelect(place)}
                                className="
                                    p-3 cursor-pointer
                                    hover:bg-slate-700/50
                                    border-b border-slate-700
                                    transition
                                "
                            >
                                <p className="text-slate-200 font-medium">
                                    {place.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddRestaurant;