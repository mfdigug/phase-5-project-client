import React from 'react'

const EventCard = ({ event, showGenerateRestaurant, showRSVP }) => {
  return (
    <div className="bg-[#8db0b0] rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1">
          {event.title}
        </h3>
        <p className="text-sm text-slate-600 mb-3">{event.date}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <h3>Filters:</h3>  
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
            {event.location_filter}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
            {event.cuisine_filter}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
            {event.price_filter}
          </span>
        </div>

        <div>
            <h3>Attendees</h3>
            <ul>
              {event.participants.map((p) => (
                <li key={p.user_id}><span>{p.username} {p.rsvp_status}</span></li>
              ))}
            </ul>
        </div>

        {/* buttons logic & components */}

      {showRSVP && (
        <div>
          <button>Accept</button>
          <button>Decline</button>
          </div>
        )}

        {showGenerateRestaurant && (
          <button>Generate Restaurant</button> 
            // onClick={() => onGenerate()} 
        )}

      </div> 
    </div>
  );
}

export default EventCard