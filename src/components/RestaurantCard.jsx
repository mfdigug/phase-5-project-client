import { useRestaurants } from "../context/RestaurantContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

const RestaurantCard = ({ restaurant, mode }) => {

const { updateRestaurantStatus, rateRestaurant, deleteRestaurant } = useRestaurants()

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


const renderStars = (rating = 0, onRate) => {
  return [...Array(5)].map((_, i) => {
    const value = i + 1;
    const filled = value <= rating;
    return (
      <button
        key={i}
        type="button"
        onClick={() => onRate(value)}
        className="focus:outline-none"
      > 
        <FontAwesomeIcon
        icon={filled ? solidStar : emptyStar} 
        className={`text-lg transition transform hover:scale-110 ${
          filled ? "text-amber-200/60" : "text-slate-600"
        }`}
        /> 
      </button>
    ) 
  }
)}

  return (
    <div className="bg-gradient-to-tr from-gray-900 to-gray-700 rounded-xl border border-slate-600 overflow-hidden shadow-[0_0_15px_rgba(20,184,166,0.5)]
    hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* <div className="aspect-3/4 overflow-hidden bg-slate-100">
        <img
          src={
            restaurant.image ||
            "https://plus.unsplash.com/premium_photo-1772065873807-06f1313b665f?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={restaurant.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://plus.unsplash.com/premium_photo-1772065873807-06f1313b665f?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
          }}
        />
      </div> */}

      <div className="p-6 space-y-2">
        <div>
          <h3 className="text-xl font-sanserif font-extralight [text-shadow:0_0_3px_rgba(220,38,38,0.6),0_0_8px_rgba(127,29,29,0.3)] text-white tracking-wide">
            {restaurant.name}
          </h3>

          <div className="mt-2 h-1 w-full bg-teal-500/30 rounded-full" />
        </div>

        <p className="text-sm text-slate-400 mt-4 mb-4 flex uppercase items-center gap-2"> <FontAwesomeIcon icon={faLocationDot} />
        {restaurant.location}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 text-xs font-opensans rounded bg-slate-700/50 border-slate-400 text-white"
          >
            {restaurant.cuisine}
          </span>

          <span className={`px-2 py-1 text-xs bg-slate-700 rounded ${priceColors[restaurant.price_range]}`}>
            {priceLabels[restaurant.price_range]}
          </span>
        
        </div>
        
        <div className="mt-4 flex items-center gap-4 justify-between">
        <button 
          onClick={() => updateRestaurantStatus(restaurant.id,
            mode === "tried" ? "wishlist" : "tried"
          )}
          className={`px-3 py-1 text-xs rounded-md border 
            ${mode === "tried"
              ? "border-indigo-500/30 text-white hover:bg-indigo-500/10"
              : "border-teal-500/30 text-white hover:bg-teal-500/10"}
            transition-all duration-200 active:scale-95`}>
            {mode === "tried" ? "Move to Wishlist" : "Mark as Tried"}
         </button>

        {mode === "wishlist" && (
          <button
            onClick={() => deleteRestaurant(restaurant.id)}
            className="px-3 py-1 text-xs rounded-md border border-red-500/30 
           text-white hover:bg-red-500/10
           transition-all duration-200 active:scale-95">
          Delete Restaurant
        </button>
        )}

        {mode === "tried" && (
          <div className="flex gap-1">
            {renderStars(restaurant.rating, (value => {
              console.log("Rated", value)
              rateRestaurant(restaurant.id, value)
            }))}
          
          </div>
        )}
        
        </div>


      </div>
    </div>
  );
};

export default RestaurantCard;
