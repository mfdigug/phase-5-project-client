import { useRestaurants } from "../context/RestaurantContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";


const RestaurantCard = ({ restaurant, mode }) => {

const { updateRestaurantStatus } = useRestaurants()

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

//   const cuisineColors = {
//    
//   };

  return (
    <div className="bg-teal-900 rounded-xl border border-teal-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
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

      <div className="p-4 space-y-2">
        <div>
          <h3 className="text-lg font-semibold text-white line-clamp-1 tracking-tight">
            {restaurant.name}
          </h3>

          <div className="mt-1 h-0.5 w-full bg-teal-500/30 rounded-full" />
        </div>

        <p className="text-sm text-slate-400 mb-3 flex items-center gap-2"> <FontAwesomeIcon icon={faLocationDot} />
        {restaurant.location}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 text-xs rounded-full bg-teal-700 text-teal-100"
            // ${cuisineColors[restaurant.cuisine]}`}
          >
            {restaurant.cuisine}
          </span>

          <span className={`px-2 py-1 text-xs rounded-full ${priceColors[restaurant.price_range]}`}>
            {priceLabels[restaurant.price_range]}
          </span>
        
        </div>

        {/* buttons logic & components */}
{/* 
        {showDeleteRestaurantt && (
          <DeleteRestaurantButton
            onClick={() => handleDeleteRestaurant(restaurantt.id)}
          />
        )}
*/}
       
          <button 
          onClick={() => updateRestaurantStatus(restaurant.id,
            mode === "tried" ? "wishlist" : "tried"
          )}
          className={`px-3 py-1 text-sm rounded-md text-white transition active:scale-95 ${
            mode === "tried"
            ? "bg-indigo-600 hover:bg-indigo-500"
            : "bg-teal-600 hover:bg-teal-500"
          }`}>
            {mode === "tried" ? "Add to Wishlist" : "Mark as Tried"}
          </button>


      </div>
    </div>
  );
};

export default RestaurantCard;
