import { useRestaurants } from "../context/RestaurantContext";

const RestaurantCard = ({restaurant, showMarkTried}) => {

const { markAsTried } = useRestaurants()

 //styling
//   const priceColors = {
//     1: "bg-green-100 text-green-800",
//     2: "bg-blue-100 text-blue-800",
//     3: "bg-yellow-100 text-yellow-800",
//     4: "bg-orange-100 text-orange-800",
//     5: "bg-red-100 text-red-800",
//   };

//   const cuisineColors = {
//    
//   };

  return (
    <div className="bg-teal-800 rounded-lg border border-[#093535] overflow-hidden hover:shadow-lg transition-shadow">
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

      <div className="p-4">
        <h3 className="font-semibold text-teal-300 mb-1 line-clamp-1">
          {restaurant.name}
        </h3>
        <p className="text-sm text-mist-300 mb-3">{restaurant.location}</p>
        <div className="flex items-center gap-2 mb-3">
          <span
            // className={`px-2 py-1 text-xs rounded ${cuisineColors[restaurant.cuisine]}`}
          >
            {restaurant.cuisine}
          </span>

          <span
            // className={`px-2 py-1 text-xs rounded ${priceColors[restaurant.price]}`}
          >
            {restaurant.price_range}
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
        {showMarkTried && (
          <button onClick={() => markAsTried(restaurant.id)}>Mark as Tried</button>
        )}

      </div>
    </div>
  );
};

export default RestaurantCard;
