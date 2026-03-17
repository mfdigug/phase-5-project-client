import React from 'react'

const EventCard = () => {
  return (
    <div className="bg-[#8db0b0] rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1">
          Event Title
        </h3>
        <p className="text-sm text-slate-600 mb-3">Event Date</p>
        
        <div className="flex items-center gap-2 mb-3">  
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
            Location Filter
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
            Cuisine Filter
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
            Price Filter
          </span>
        </div>

        <div>
            <h3>Attendees</h3>
            <ul>
                <li>Person 1 <span>Attending</span></li>
                <li>Person 1 <span>Declined</span></li>
                <li>Person 1 <span>Invited</span></li>
            </ul>
        </div>

        {/* buttons logic & components */}

        {/* {showRSVP && (
        <div>
          <AcceptButton
            // onClick={() => handleAccept()}
          />
          <DeclineButton
            // onClick={() => handleAccept()}
          />
          </div>

        )}

        {showGenerateRestaurant && (
          <GenerateRestaurantButton 
            // onClick={() => onGenerate()} 
          />
        )} */}

      </div> 
    </div>
  );
}

export default EventCard