import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"

const EventContext = createContext()

export const useEvents = () => useContext(EventContext)

export const EventProvider = ({ children }) => {
    const { user } = useAuth();
    const [events, setEvents] = useState({ created: [], invited: [] })

    useEffect(() => {
        if (!user) return;

        const fetchMyEvents = async () => {
            try {
                const res = await fetch("/api/my_events", {
                    credentials: "include"
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                    console.log("Created events:", data.created);
                    console.log("Invited events:", data.invited);
                    setEvents(data);
                } else {
                    setEvents({ created: [], invited: [] })
                } 
            } catch (err) {
                    console.error("Failed to fetch events", err);
                    setEvents({ created: [], invited: [] })
            }
        }

        fetchMyEvents();

        }, [user]);

        const updateRSVP = async (id, rsvp_status) => {

        const payload = { rsvp_status };

        console.log("Sending PATCH request:", {
            id,
            payload
        });

        const res = await fetch(`/api/event_participants/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed");

        const updated = await res.json();

        setEvents(prev => ({
            ...prev,
            invited: prev.invited.map(event => ({
                ...event,
                participants: event.participants.map(ep =>
                    ep.id === updated.id
                    ? { ...ep, ...updated }
                    : ep
                )
            }))
        })
        );
    };

    const generateRestaurant = async (eventId) => {

        const res = await fetch(`/api/events/${eventId}/generate_restaurant`, {
            method: "POST",
            credentials: "include"
        });

        if (!res.ok) throw new Error("Failed to generate restaurant");

        const data = await res.json();
        console.log("FULL RESPONSE:", data);
        
        const chosenRestaurant = data.chosen;

        setEvents(prev => ({
            ...prev,
            created: prev.created.map(event =>
                event.id === Number(eventId)
                ? { ...event, selected_restaurant: chosenRestaurant }
                : event
            ),

        }));
    }

    const createEvent = async (eventData) => {
        const res = await fetch("/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(eventData)
        });

        if (!res.ok) {
            const err = await res.json();
            console.error("Failed to add event:", err);
            throw new Error("Failed to add event")
        }

        const newEvent = await res.json();

        setEvents((prev) => ({
            ...prev,
            created: [...prev.created, newEvent]
        }))
    }

        const deleteEvent = async (id) => {
        const res = await fetch(`/api/events/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        console.log("DELETE status:", res.status);

        if (!res.ok) {
            const text = await res.text();
            console.error("DELETE failed:", text)
            throw new Error("Failed to delete event");
        } 

        setEvents(prev => ({
            ...prev,
            created: prev.created.filter(e => e.id !== id)
        })
            
        );
    }


    return (
        <EventContext.Provider value={{ events, setEvents, updateRSVP, generateRestaurant, createEvent, deleteEvent }}>
            {children}
        </EventContext.Provider>
    );

}