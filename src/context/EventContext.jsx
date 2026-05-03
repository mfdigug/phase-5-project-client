import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"
import { apiFetch } from "../utils/api";

const EventContext = createContext()

export const useEvents = () => useContext(EventContext)

export const EventProvider = ({ children }) => {
    const { user } = useAuth();
    const [events, setEvents] = useState({ created: [], invited: [] })

    useEffect(() => {
        if (!user) return;

        const fetchMyEvents = async () => {
            try {
                const data = await apiFetch("/api/my_events");
                setEvents(data); 
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

        const updated = await apiFetch(`/api/event_participants/${id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        });

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

        const data = await apiFetch(
            `/api/events/${eventId}/generate_restaurant`, {
            method: "POST",
        });

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
        const newEvent = await apiFetch("/api/events", {
            method: "POST",
            body: JSON.stringify(eventData)
        });

        setEvents((prev) => ({
            ...prev,
            created: [...prev.created, newEvent]
        }))
    }

    const deleteEvent = async (id) => {
        await apiFetch(`/api/events/${id}`, {
            method: "DELETE",
        });

        setEvents(prev => ({
            ...prev,
            created: prev.created.filter(e => e.id !== id)
        }));
    }


    return (
        <EventContext.Provider value={{ 
            events, 
            setEvents, 
            updateRSVP, 
            generateRestaurant, 
            createEvent, 
            deleteEvent }}>
            {children}
        </EventContext.Provider>
    );

}