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

    return (
        <EventContext.Provider value={{ events, setEvents }}>
            {children}
        </EventContext.Provider>
    );

}