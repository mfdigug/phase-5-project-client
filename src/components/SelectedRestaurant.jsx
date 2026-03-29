import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const SelectedRestaurant = ({ restaurant, price, priceLabels, priceColors }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-700/40 to-slate-900 rounded-2xl p-6 shadow-xl shadow-red-600/20 text-white mb-6 items-center">
      
      {/* Header */}
      <p className="text-xs text-slate-300 uppercase mb-3 self-start">
        Selected Restaurant
      </p>

      {/* Name */}
      <h4 className="text-white font-antic text-xl tracking-widest mb-3 text-center">
        {restaurant.name}
      </h4>

      {/* Location */}
      <div className="flex items-center justify-center gap-2 text-sm text-slate-300 mb-2">
        <FontAwesomeIcon 
          icon={faLocationDot} 
          className="text-teal-400/40 text-xs"
        />
        <span className="truncate">{restaurant.location}</span>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-center w-full max-w-xs gap-2 pt-1">
        {price && (
          <span
            className={`
              text-xs px-2 py-1 rounded-md
              bg-slate-800/60
              border border-slate-500/20
              shadow-[0_0_6px_rgba(255,255,255,0.05)]
              ${priceColors[price]}
            `}
          >
            {priceLabels[price]}
          </span>
        )}

        <p className="text-xs text-slate-400 tracking-wide">
          {restaurant.cuisine}
        </p>

      </div>
    </div>
  );
};

export default SelectedRestaurant;