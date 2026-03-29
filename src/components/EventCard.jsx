import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck,  faHourglass, faRectangleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { formatDateTime } from "../utils/formatDateTime";
import { useEvents } from "../context/EventContext"
import { useAuth } from "../context/AuthContext"
import { useState } from "react";

const EventCard = ({ event, showGenerateRestaurant, showRSVP, showDeleteEvent }) => {

  const { user } = useAuth();
  const { updateRSVP, generateRestaurant, deleteEvent } = useEvents();
  const MyEP = event.participants.find(p => p.user_id === user.id)
  const myRSVPStatus = MyEP?.rsvp_status;

  const [isEditing, setIsEditing] = useState(false);
  const handleRSVP = async (status) => {
    await updateRSVP(MyEP.id, status);
    setIsEditing(false)
  }

  const rsvpIcon = {
    accepted: faSquareCheck,
    invited: faHourglass,
    declined: faRectangleXmark,
  };

  const rsvpStyles = {
    accepted: "text-emerald-700/80",
    invited: "text-amber-500/40",
    declined: "text-rose-700/40",
  };

  const priceLabels = {
  1: "$",
  2: "$$",
  3: "$$$",
  4: "$$$$",
  5: "$$$$$",
};


const priceColors = {
  1: "text-green-500",
  2: "text-blue-500",
  3: "text-yellow-500",
  4: "text-orange-500",
  5: "text-red-500",
};


  return (
    <div className="
    bg-gradient-to-tr from-slate-800 to-teal-900/40 
    rounded-xl
    shadow-[0_0_4px_rgba(20,184,166,0.4),0_0_12px_rgba(20,184,166,0.25)]
    overflow-hidden
    hover:shadow-[0_0_4px_rgba(20,184,166,0.3),0_0_10px_rgba(20,184,166,0.15)] 
    hover:-translate-y-1 
    transition-all duration-200">

      <div className="p-4 space-y-2">
        <div>
          <h3 className="text-2xl font-extralight font-antica text-white line-clamp-1 tracking-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] hover:line-clamp-none">
            {event.title}
          </h3>
          <div className="mt-1 h-0.5 w-full bg-teal-700/30 rounded-full" />
        </div>
        <p className="text-sm text-slate-500 mb-3">{formatDateTime(event.date)}</p>
        
        {!event.selected_restaurant && (
        <div className="flex flex-wrap items-start gap-2 mb-4">
          
          <span className="
            flex items-center gap-2 px-2 py-1 
            text-xs bg-slate-700/40 text-slate-200 font-opensans
            rounded-md
            shadow-[0_0_4px_rgba(20,184,166,0.2)] 
            border border-slate-500/30 
            backdrop-blur-sm">
                
                <FontAwesomeIcon icon={faLocationDot} />
                {event.location_filter}
          </span>
          
          
          <span className="
          px-2 py-1 text-xs 
          rounded-md border border-slate-500/30 
          shadow-[0_0_4px_rgba(20,184,166,0.2)]
          bg-slate-700/40 
          text-slate-200 font-opensans
          backdrop-blur-sm">
            {event.cuisine_filter}
          </span>

          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs  bg-slate-700/40
                 border border-slate-500/30 
                 shadow-[0_0_4px_rgba(20,184,166,0.2)]
                 backdrop-blur-sm rounded ${priceColors[event.price_filter]}`}>
            {priceLabels[event.price_filter]}
          </span>
        </div>
        )}

        {event.selected_restaurant && (
            <div className="mt-3 p-3 rounded-lg bg-teal-900/40 border border-teal-500/30 
shadow-[0_0_6px_rgba(20,184,166,0.2)]">
    
              <p className="text-xs text-teal-300 uppercase tracking-wide">
                🍽️ Selected Restaurant
              </p>

              <h4 className="text-white font-semibold text-lg">
                {event.selected_restaurant.name}
              </h4>

              <p className="flex items-center gap-2 text-sm text-slate-300">
                <FontAwesomeIcon icon={faLocationDot} />
                {event.selected_restaurant.location}
              </p>

              <div className="flex justify-between items-center mt-2">

              <p className="text-xs text-teal-200 mt-1">
                {event.selected_restaurant.cuisine}
              </p>

              {event.price_filter && (
              <span className={`text-xs px-2 py-1 rounded ${priceColors[event.price_filter]}`}>
                {priceLabels[event.price_filter]}
              </span>
              )}
              </div>
            </div>
          )}

        <div>
          <h3 className="text-white font-sanserif font-light mb-2">Attendees</h3>

          <ul className="space-y-1">
            {event.participants.map((p) => (
              <li key={p.user_id} className="flex items-center gap-2 text-sm text-slate-400">
                
                <FontAwesomeIcon
                  icon={rsvpIcon[p.rsvp_status]}
                  className={rsvpStyles[p.rsvp_status]}
                />

                <span>
                  {p.username}
                </span>

              </li>
            ))}
          </ul>
        </div>

        {/* buttons logic & components */}
      
      <div className="flex flex-wrap gap-2 mt-2">
        {showRSVP && (
          <div className="flex flex-col gap-2 mt-4 w-full items-center">
            {isEditing || !myRSVPStatus ? (
         
          <div className="flex gap-4 justify-center w-full">
            
            <button 
            onClick={() => MyEP && updateRSVP(MyEP.id, "accepted")}
            className="px-3 py-1 text-xs rounded-md border transition-all duration-200 active:scale-95 border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/10">
              Accept
            </button>


            <button
            onClick={() => MyEP && updateRSVP(MyEP.id, "declined")}
            className="px-3 py-1 text-xs rounded-md border transition-all duration-200 active:scale-95 border-red-500/20 text-red-300 hover:bg-red-500/10">
            Decline
            </button>
          </div>
    ) : (
          <div className="flex flex-wrap gap-2 text-center w-full items-center">
            <span className="text-slate-300 text-xs font-medium">
              Your RSVP:
              <span className="text-white font-semibold ml-1">
                {myRSVPStatus === "accepted" ? "Accepted" : "Declined"}
              </span>
            </span>

            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-xs rounded-md border border-slate-500/20
               text-slate-400 hover:bg-slate-500/10 transition-all duration-200
               active:scale-95"
            >
              Edit your response
            </button>
          
          </div>
    )}
    </div>
        )}

      <div className="flex flex-col gap-3 mt-4 w-full">
        <div className="flex flex-col gap-4 items-center w-full">
        {showGenerateRestaurant && !event.selected_restaurant && (
            <button
              onClick={() => generateRestaurant(event.id)}
              className="
              w-full 
              sm:w-auto 
              px-6 py-2 
              text-sm uppercase tracking-widest text-white/80
              rounded-lg
              bg-gradient-to-r from-slate-700/60 to-slate-600/60
              shadow-[0_0_6px_2px_rgba(20,184,166,0.4)]
              hover:shadow-[0_0_12px_4px_rgba(20,184,166,0.7)]  
              transition-all duration-200 active:scale-95"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
            >
              Generate Restaurant
            </button>
        )}
        
        {showDeleteEvent && (
          <button
            onClick={() => deleteEvent(event.id)}
            className="px-1 py-1 text-xs
                 text-red-300 
                 border-b-2 border-transparent 
                 hover:border-red-500/50
                 hover:text-red-400
                 transition duration-200 active:scale-95"
          >
            Delete Event
          </button>
        )}
      </div>
      </div>
      </div>

      </div> 
    </div>
  );
}

export default EventCard