import RestaurantCard from './RestaurantCard'
import { useAuth } from "../context/AuthContext";
import { useRestaurants } from "../context/RestaurantContext"


const Wishlist = () => {
  const { user } = useAuth();
  const { restaurants } = useRestaurants();




const wishlistRestaurants = restaurants.filter((restaurant) => restaurant.status === "wishlist")

// console.log("User:", user);
  // console.log(wishlistRestaurants)



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="flex flex-col items-start justify-center h-full">
        
        <h2 className="text-2xl font-semibold text-slate-700 mb-6">
        Wishlist
        </h2>
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} showMarkTried={true}/>
          
        ))} 

        </div>
      </div>
    </div>
    
  )
}

export default Wishlist