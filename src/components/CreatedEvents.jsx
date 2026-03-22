import { NavLink } from "react-router-dom";
import { useAuth } from  "../context/AuthContext";
import { useEvents } from "../context/EventContext"
import EventCard from "./EventCard"
import CreateEvent from "./CreateEvent";

const CreatedEvents = () => {
    const { user } = useAuth()
    const  { events } = useEvents()
  
    const createdEvents = events.created
    console.log(createdEvents)
  
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="flex flex-col items-start justify-center h-full">

        <div className="flex items-center justify-between w-full mb-6">
          <h2 className="text-2xl font-semibold text-slate-700 ">
            Create A New Event
          </h2>
          
          <NavLink 
          to="/dashboard/events/create_event"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500 active:scale-95 transition-colors">
            Create Event
          </NavLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {createdEvents.map((event) => (
                <EventCard key={event.id} event={event} showGenerateRestaurant={true}/>  
        ))} 
        </div>

      </div>
    </div>

  )
}

export default CreatedEvents