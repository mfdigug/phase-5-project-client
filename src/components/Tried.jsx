import RestaurantCard from './RestaurantCard'
import { useAuth } from "../context/AuthContext";

const Tried = () => {

  const { user } = useAuth();

  console.log("User:", user);
  console.log("Restaurants:", user.restaurants)

  const triedRestaurants = user?.restaurants?.filter((restaurant) => restaurant.status === "tried") || [];

  console.log(triedRestaurants)


  return (
    <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="flex flex-col items-start justify-center h-full">
             
              <h2 className="text-2xl font-semibold text-slate-500 mb-2">
              Tried
              </h2>
            
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {triedRestaurants.map((restaurant) => (
                      <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                
             ))} 

              </div>
          </div>
        </div>
    </div>
    
  )
}

export default Tried