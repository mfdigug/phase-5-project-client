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
      <div className="flex flex-col items-center justify-center h-full">
         
        <h2 className="text-2xl md:text-3xl font-light font-antic text-slate-300 mb-6">
        Invited Events
        </h2>
      
        <div className="grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            justify-items-center
            gap-6">
            {invitedEvents.map((event) => (
              <div className="w-full sm:w-[260px] md:w-[280px] lg:w-[300px]">
                <EventCard key={event.id} event={event} showRSVP={true}/>
              </div>
            ))}
        </div>
    
      </div>
    </div>
  )
}

export default Invited