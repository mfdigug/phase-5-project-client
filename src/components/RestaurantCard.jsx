import { useRestaurants } from "../context/RestaurantContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

const RestaurantCard = ({ userRestaurant, mode }) => {

const { updateRestaurant, deleteRestaurant } = useRestaurants()

console.log(userRestaurant)

// .personal_rating
// .status
// restaurant
// .address
// .cuisine_override
// .google_place_id
// .id
// .name
// .photo_refs
// .price_level
// .website


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
    <div className="bg-gradient-to-tr from-gray-900 to-gray-700 rounded-xl border border-slate-600 overflow-hidden shadow-[0_0_3px_rgba(20,184,166,0.4),0_0_8px_rgba(20,184,166,0.25),0_0_14px_rgba(20,184,166,0.10)]
    hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full w-full">
            {userRestaurant.restaurant.photo_refs?.length > 0 && (
              <div className="h-48 overflow-hidden bg-slate-800">
                <img
                  src={`${import.meta.env.VITE_API_URL}/api/photo/${userRestaurant.restaurant.photo_refs[0]}`}
                  alt={userRestaurant.restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

      <div className="p-6 space-y-2">
        <div>
          <h3 className="text-xl font-sanserif font-extralight [text-shadow:0_0_3px_rgba(220,38,38,0.6),0_0_8px_rgba(127,29,29,0.3)] text-white line-clamp-1 tracking-wide hover:line-clamp-none">
            {userRestaurant.restaurant.name}
          </h3>

          <div className="mt-2 h-1 w-full bg-teal-500/30 rounded-full" />
        </div>

        <p className="text-sm text-slate-400 mt-4 mb-4 flex items-start gap-2">
          <FontAwesomeIcon icon={faLocationDot} className="mt-1 shrink-0" />
          <span className="line-clamp-2 hover:line-clamp-none">
            {userRestaurant.restaurant.address}
          </span>
        </p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="max-w-[50%] px-2 py-1 text-xs font-opensans rounded bg-slate-700/50 border-slate-400 text-white truncate" 
          title={userRestaurant.restaurant.cuisine_tags?.join(", ") || userRestaurant.restaurant.cuisine_override || "Restaurant"}
        >
            {userRestaurant.restaurant.cuisine_tags?.join(", ") || userRestaurant.restaurant.cuisine_override || "Restaurant"}
          </span>

          {userRestaurant.restaurant.price_level ? (
            <span className={`px-2 py-1 text-xs bg-slate-700 rounded ${priceColors[userRestaurant.restaurant.price_level]}`}>
              {priceLabels[userRestaurant.restaurant.price_level]}
            </span>
          ) : (
            <span className="px-2 py-1 text-xs bg-slate-700 rounded text-slate-400">
              Price not listed
            </span>
          )}
        
        </div>
        
        <div className="mt-4 flex items-center gap-4 justify-between">
        <button 
          onClick={() => updateRestaurant(userRestaurant.id, {
            status: mode === "tried" ? "wishlist" : "tried"
          })}
          className={`px-3 py-1 text-xs rounded-md border 
            ${mode === "tried"
              ? "border-indigo-500/30 text-white hover:bg-indigo-500/10"
              : "border-teal-500/30 text-white hover:bg-teal-500/10"}
            transition-all duration-200 active:scale-95`}>
            {mode === "tried" ? "Move to Wishlist" : "Mark as Tried"}
         </button>

        {mode === "wishlist" && (
          <button
            onClick={() => deleteRestaurant(userRestaurant.id)}
            className="px-3 py-1 text-xs rounded-md border border-red-500/30 
           text-white hover:bg-red-500/10
           transition-all duration-200 active:scale-95">
          Delete Restaurant
        </button>
        )}

        {mode === "tried" && (
          <div className="flex gap-1">
            {renderStars(userRestaurant.personal_rating, (value => {
              console.log("Rated", value)
              updateRestaurant(userRestaurant.id, {
                personal_rating: value})
            }))}
          
          </div>
        )}
        
        </div>

          {userRestaurant.restaurant.website && (
          <div className="pt-3 text-center">
            <a
              href={userRestaurant.restaurant.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-teal-400 hover:underline"
            >
              Visit website
            </a>
          </div>
        )}

      </div>
    </div>
  );
};

export default RestaurantCard;
