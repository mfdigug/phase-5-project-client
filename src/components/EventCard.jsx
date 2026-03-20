import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClock, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { formatDateTime } from "../utils/formatDateTime";


const EventCard = ({ event, showGenerateRestaurant, showRSVP }) => {

  const rsvpIcon = {
    accepted: faCheckCircle,
    invited: faClock,
    declined: faTimesCircle,
  };

  const rsvpStyles = {
    accepted: "text-emerald-700",
    invited: "text-amber-700",
    declined: "text-rose-700",
  };

  const priceLabels = {
  1: "$",
  2: "$$",
  3: "$$$",
  4: "$$$$",
  5: "$$$$$",
};


const priceColors = {
  1: "bg-green-100 text-green-800",
  2: "bg-blue-100 text-blue-800",
  3: "bg-yellow-100 text-yellow-800",
  4: "bg-orange-100 text-orange-800",
  5: "bg-red-100 text-red-800",
};

  return (
    <div className="bg-[#8db0b0] rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
      <div className="p-4 space-y-2">
        <div>
          <h3 className="text-lg font-semibold text-white line-clamp-1 tracking-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]">
            {event.title}
          </h3>
          <div className="mt-1 h-0.5 w-full bg-teal-700/30 rounded-full" />
        </div>
        <p className="text-sm text-slate-600 mb-3">{formatDateTime(event.date)}</p>
        
        <div className="flex flex-col items-start gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
            Location Filter: {event.location_filter}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
            Cuisine Filter: {event.cuisine_filter}
          </span>

          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded ${priceColors[event.price_filter]}`}>
            {priceLabels[event.price_filter]}
          </span>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Attendees</h3>

          <ul className="space-y-1">
            {event.participants.map((p) => (
              <li key={p.user_id} className="flex items-center gap-2 text-sm text-slate-800">
                
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
          <>
            <button 
            // onClick={() => markAsAttending(event.id)}
            className="px-3 py-1 text-sm rounded-md bg-green-600 text-white hover:bg-green-500 active:scale-95 transition">
              Accept
            </button>
            <button
            // onClick={() => markAsDeclined(event.id)}
            className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-500 active:scale-95 transition"
            >
              Decline
            </button>
          </>
        )}

        {showGenerateRestaurant && (
          <button
          // onClick={() => onGenerate()}
          className="px-3 py-1 text-sm rounded-md bg-teal-600 text-white hover:bg-teal-500 active:scale-95 transition"
          >
            Generate Restaurant
          </button>        
        )}

      </div>

      </div> 
    </div>
  );
}

export default EventCard