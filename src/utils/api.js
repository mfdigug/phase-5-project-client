const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    const contentType = res.headers.get("content-type");

    const data = contentType?.includes("application/json")
        ? await res.json()
        : null;

    if (!res.ok) {
        throw data || new Error("API request failed");
    }

    return data;
};