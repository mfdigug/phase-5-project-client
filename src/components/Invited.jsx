import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext"
import EventCard from "./EventCard"

const Invited = () => {
  const { user } = useAuth()
  const  { events } = useEvents()

  const invitedEvents = events.invited
  console.log(invitedEvents)


  return (
    <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="flex flex-col items-start justify-center h-full">
                 
                  <h2 className="text-2xl font-semibold text-slate-500 mb-2">
                  Invited Events
                  </h2>
                
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {invitedEvents.map((event) => (
                          <EventCard key={event.id} event={event} showRSVP={true}/>
                    
                 ))} 
    
                  </div>
              </div>
            </div>
        </div>
  )
}

export default Invited