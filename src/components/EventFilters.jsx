import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const EventFilters = ({ location, cuisine, price, priceLabels, priceColors }) => {
  return (
    <div className="flex flex-wrap items-start gap-2 mb-4">
      <span className="
        flex items-center gap-2 px-2 py-1 
        text-xs bg-slate-700/40 text-slate-200 font-opensans
        rounded-md shadow-[0_0_4px_rgba(20,184,166,0.2)] 
        border border-slate-500/30 backdrop-blur-sm
      ">
        <FontAwesomeIcon icon={faLocationDot} />
        {location}
      </span>

      <span className="
        px-2 py-1 text-xs rounded-md border border-slate-500/30
        shadow-[0_0_4px_rgba(20,184,166,0.2)]
        bg-slate-700/40 text-slate-200 font-opensans backdrop-blur-sm
      ">
        {cuisine}
      </span>

      {price && (
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs bg-slate-700/40 border border-slate-500/30 shadow-[0_0_4px_rgba(20,184,166,0.2)] backdrop-blur-sm rounded ${priceColors[price]}`}>
          {priceLabels[price]}
        </span>
      )}
    </div>
  );
};

export default EventFilters;