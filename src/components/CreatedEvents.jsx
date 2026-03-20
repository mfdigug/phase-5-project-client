import { useAuth } from  "../context/AuthContext";
import { useEvents } from "../context/EventContext"
import EventCard from "./EventCard"

const CreatedEvents = () => {
    const { user } = useAuth()
    const  { events } = useEvents()
  
    const createdEvents = events.created
    console.log(createdEvents)
  
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="flex flex-col items-start justify-center h-full">

        <h2 className="text-2xl font-semibold text-slate-700 mb-6">
        Created Events
        </h2>

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