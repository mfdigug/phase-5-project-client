import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faHourglass, faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { formatDateTime } from "../utils/formatDateTime";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

import RSVP from "./RSVP";
import GenerateRestaurantButton from "./GenerateRestaurantButton";
import SelectedRestaurant from "./SelectedRestaurant";
import EventFilters from "./EventFilters";

const rsvpIcon = {
  accepted: faSquareCheck,
  invited: faHourglass,
  declined: faRectangleXmark,
};

const rsvpStyles = {
  accepted: "text-emerald-500/70",
  invited: "text-amber-500/70",
  declined: "text-rose-700/70",
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

const EventCard = ({ event, showGenerateRestaurant, showRSVP, showDeleteEvent }) => {
  const { user } = useAuth();
  const { updateRSVP, generateRestaurant, deleteEvent } = useEvents();
  const MyEP = event.participants.find(p => p.user_id === user.id);
  const myRSVPStatus = MyEP?.rsvp_status;

  return (
    <div className="
      bg-gradient-to-tr from-slate-800 to-teal-900/40 
      rounded-xl
      shadow-[0_0_4px_rgba(20,184,166,0.4),0_0_12px_rgba(20,184,166,0.25)]
      overflow-hidden
      hover:shadow-[0_0_4px_rgba(20,184,166,0.3),0_0_10px_rgba(20,184,166,0.15)] 
      hover:-translate-y-1 
      transition-all duration-200
      flex flex-col h-full w-full
      min-w-0
    ">
      <div className="p-4 space-y-2">
        <div>
          <h3 className="text-2xl font-extralight font-antica text-white line-clamp-1 tracking-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] hover:line-clamp-none">
            {event.title}
          </h3>
          <div className="mt-1 h-0.5 w-full bg-teal-700/30 rounded-full" />
        </div>

        <p className="text-sm text-slate-500 mb-3">{formatDateTime(event.date)}</p>

        {!event.selected_restaurant && (
          <EventFilters
            location={event.location_filter}
            cuisine={event.cuisine_filter}
            price={event.price_filter}
            priceLabels={priceLabels}
            priceColors={priceColors}
          />
        )}

        {event.selected_restaurant && (
          <SelectedRestaurant
            restaurant={event.selected_restaurant}
            price={event.price_filter}
            priceLabels={priceLabels}
            priceColors={priceColors}
          />
        )}

        <div className="relative group">
          <ul className="space-y-1">
            {event.participants.slice(0, 2).map(p => (
              <li key={p.user_id} className="flex items-center gap-2 text-sm text-slate-400">
                <FontAwesomeIcon icon={rsvpIcon[p.rsvp_status]} className={rsvpStyles[p.rsvp_status]} />
                <span>{p.username}</span>
              </li>
            ))}
            {event.participants.length > 2 && (
              <li className="text-sm text-slate-400 cursor-pointer">+{event.participants.length - 2} more...</li>
            )}
          </ul>

          {/* Hover: show all participants */}
          {event.participants.length > 2 && (
            <div className="absolute top-0 left-0 mt-0 p-2 w-44 bg-slate-800/90 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
              <ul className="space-y-1">
                {event.participants.map(p => (
                  <li key={p.user_id} className="flex items-center gap-2 text-sm">
                    <FontAwesomeIcon icon={rsvpIcon[p.rsvp_status]} className={rsvpStyles[p.rsvp_status]} />
                    <span>{p.username}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {showRSVP && MyEP && (
          <RSVP
            MyEP={MyEP}
            myRSVPStatus={myRSVPStatus}
            updateRSVP={updateRSVP}
          />
        )}

        <div className="flex flex-col gap-3 mt-4 w-full items-center">
          {showGenerateRestaurant && !event.selected_restaurant && (
            <GenerateRestaurantButton
              eventId={event.id}
              generateRestaurant={generateRestaurant}
            />
          )}

          {showDeleteEvent && (
            <button
              onClick={() => deleteEvent(event.id)}
              className="px-1 py-1 text-xs text-red-300 border-b-2 border-transparent hover:border-red-500/50 hover:text-red-400 transition duration-200 active:scale-95"
            >
              Delete Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;