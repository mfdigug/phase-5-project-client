import { useAuth } from  "../context/AuthContext";
import { useEvents } from "../context/EventContext"
import EventCard from "./EventCard"

const CreatedEvents = () => {
    const { user } = useAuth()
    const  { events } = useEvents()
  
    const createdEvents = events.created
    console.log(createdEvents)
  
  
  return (
    <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="flex flex-col items-start justify-center h-full">
                 
                  <h2 className="text-2xl font-semibold text-slate-500 mb-2">
                  Created Events
                  </h2>
                
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {createdEvents.map((event) => (
                          <EventCard key={event.id} event={event} showGenerateRestaurant={true}/>
                    
                 ))} 
    
                  </div>
              </div>
            </div>
        </div>
  )
}

export default CreatedEvents