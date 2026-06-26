import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const SelectedRestaurant = ({ restaurant, priceLabels, priceColors }) => {
  return (
    <div className="group bg-gradient-to-br from-slate-900 via-slate-700/40 to-slate-900 rounded-2xl p-6 shadow-xl shadow-red-600/20 text-white mb-6 items-center">
      
      {/* Header */}
      <p className="text-xs text-slate-300 uppercase mb-3 self-start">
        Selected Restaurant
      </p>

      {/* Name */}
      <h4 className="text-white font-antic text-xl tracking-widest mb-3 text-center">
        {restaurant.name}
      </h4>

      <div className="transition-all duration-300 ease-in-out 
                      max-h-0 group-hover:max-h-[500px] overflow-hidden
                      flex flex-col items-center gap-2">
      {/* Location */}
      <div className="flex items-center justify-center gap-2 text-sm text-slate-300 mb-2 w-full max-w-xs">
        <FontAwesomeIcon 
          icon={faLocationDot} 
          className="text-teal-400/40 text-xs shrink-0"
        />
        <span className="text-center">{restaurant.address || "Address not listed"}</span>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-center w-full max-w-xs gap-2 pt-1">
        {restaurant.price_level ? (
          <span
            className={`
              text-xs px-2 py-1 rounded-md
              bg-slate-800/60
              border border-slate-500/20
              shadow-[0_0_6px_rgba(255,255,255,0.05)]
              ${priceColors[restaurant.price_level]}
            `}
          >
            {priceLabels[restaurant.price_level]}
          </span>
        ) : (
          <span
            className="
              text-xs px-2 py-1 rounded-md
              bg-slate-800/60
              border border-slate-500/20
              text-slate-400
              whitespace-nowrap
            "
          >
            price not listed
          </span>
        )}

        <p className="text-xs text-slate-400 tracking-wide text center
          bg-slate-800/60
            border border-slate-500/20
            px-2 py-1 rounded-md">
          {restaurant.cuisine_tags?.join(", ") || "Restaurant"}
        </p>

      </div>

      {restaurant.website && (
          <a
            href={restaurant.website}
            target="_blank"
            rel="noopener noreferrer"
            className="pt-2 text-xs text-slate-400 hover:text-teal-400 hover:underline"
          >
            Visit website
          </a>
      )}

    </div>
    </div>
  );
};

export default SelectedRestaurant;