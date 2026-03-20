import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext"
import EventCard from "./EventCard"

const Invited = () => {
  const { user } = useAuth()
  const  { events } = useEvents()

  const invitedEvents = events.invited
  console.log(invitedEvents)


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="flex flex-col items-start justify-center h-full">
           
        <h2 className="text-2xl font-semibold text-slate-700 mb-6">
        Invited Events
        </h2>
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {invitedEvents.map((event) => (
                <EventCard key={event.id} event={event} showRSVP={true}/>
            ))}
        </div>
    
      </div>
    </div>
  )
}

export default Invited