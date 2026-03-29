import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const SelectedRestaurant = ({ restaurant, price, priceLabels, priceColors }) => {
  return (
    <div className="bg-green-500">
      
      {/* Header */}
      <p className="text-xs text-slate-300 uppercase mb-2">
        Selected Restaurant
      </p>

      {/* Name */}
      <h4 className="text-white font-antic text-xl tracking-widest mb-2">
        {restaurant.name}
      </h4>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <FontAwesomeIcon 
          icon={faLocationDot} 
          className="text-teal-400/80 text-xs"
        />
        <span className="truncate">{restaurant.location}</span>
      </div>

      {/* Footer row */}
      <div className="flex justify-between items-center pt-1">
        <p className="text-xs text-teal-200/90 tracking-wide">
          {restaurant.cuisine}
        </p>

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
      </div>
    </div>
  );
};

export default SelectedRestaurant;