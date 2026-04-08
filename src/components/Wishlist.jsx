import { NavLink } from 'react-router-dom';
import RestaurantCard from './RestaurantCard'
import { useAuth } from "../context/AuthContext";
import { useRestaurants } from "../context/RestaurantContext"


const Wishlist = () => {
  const { user } = useAuth();
  const { restaurants } = useRestaurants();


const wishlistRestaurants = restaurants.filter((restaurant) => restaurant.status === "wishlist")

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="flex flex-col items-center justify-center h-full">
        
        <div className="flex items-center justify-between w-full mb-6 relative">
          <div className="w-0 md:w-auto"></div>
          <h2 className="
              text-2xl font-light font-antic text-slate-300 
              md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            Wishlist
          </h2>
          
          <NavLink 
          to="/dashboard/restaurants/add_restaurant"
          className="
          bg-slate-800/60 text-white px-4 py-2 rounded
          hover:shadow-[0_0_15px_rgba(20,184,166,0.5)]
          hover:text-rose-100
          active:scale-95
          transition-colors">
            Add Restaurant
          </NavLink>
        </div>
      
        <div className="grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            justify-items-center
            gap-6">
            {wishlistRestaurants.map((restaurant) => (
              <div className="w-full sm:w-[260px] md:w-[280px] lg:w-[300px]">
                <RestaurantCard key={restaurant.id} restaurant={restaurant} mode="wishlist"/>
              </div>
          
        ))} 

        </div>
      </div>
    </div>
    
  )
}

export default Wishlist