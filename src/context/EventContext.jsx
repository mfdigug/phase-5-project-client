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


    return (
        <EventContext.Provider value={{ events, setEvents, updateRSVP }}>
            {children}
        </EventContext.Provider>
    );

}