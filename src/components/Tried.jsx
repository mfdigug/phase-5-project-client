import RestaurantCard from './RestaurantCard'
import { useAuth } from "../context/AuthContext";
import { useRestaurants } from "../context/RestaurantContext"

const Tried = () => {

  const { user } = useAuth();

  console.log("User:", user);
  const { restaurants } = useRestaurants();
  
  const triedRestaurants = restaurants.filter((restaurant) => restaurant.status === "tried");

  // console.log(triedRestaurants)


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="flex flex-col items-center justify-center h-full">
        
        <h2 className="text-2xl md:text-3xl font-light font-antic text-slate-300 mb-6">
          Tried
        </h2>
      
        <div className="grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            justify-items-center
            gap-6">
            {triedRestaurants.map((restaurant) => (
                <div className="w-full max-w-xs sm:w-auto">
                <RestaurantCard key={restaurant.id} restaurant={restaurant} mode="tried"/>
                </div>
            ))} 
        </div>
  
      </div>
    </div>
    
  )
}

export default Tried