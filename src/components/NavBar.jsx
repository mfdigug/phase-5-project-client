import { useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
 
export default function NavBar() {
  
  const location = useLocation();
  const isMyRestaurants = location.pathname.startsWith("/dashboard/restaurants")
  const isMyEvents = location.pathname.startsWith("/dashboard/events")
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await logout();
    navigate("/login")

  }

  return (
    <div>
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-[120px]">
              <div className="flex flex-col justify-center h-full">
                <h1 className="text-3xl font-semibold text-teal-900">
                    Dinner Decider
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Welcome {user?.username}
                </p>
                <button onClick={handleLogoutClick}
                className="mt-2 text-sm px-3 py-1 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition w-fit"
                >
                  Logout
                </button>
              </div>

                <nav className="flex flex-col items-end justify-center h-full">
                <div className="flex gap-4">

                <NavLink
                  to="/dashboard/restaurants"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg ${
                      isActive
                        ? "bg-teal-900 text-white"
                        : "text-teal-600 hover:bg-slate-100"
                    }`
                  }
                >
                  My Restaurants
                </NavLink>

                <NavLink
                  to="/dashboard/events"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg ${
                      isActive
                        ? "bg-teal-900 text-white"
                        : "text-teal-600 hover:bg-slate-100"
                    }`
                  }
                >
                  MyEvents
                </NavLink>
              </div>

              <div className="flex gap-2 mt-2 min-h-[40px]">
                
                {isMyRestaurants && (
                  <div className="flex gap-2 border-b border-slate-200">
                    <NavLink
                      to="/dashboard/restaurants/wishlist"
                      className={({isActive}) =>
                        `flex items-center gap-2 px-4 py-3 border-b-2 text-slate-600 ${
                          isActive
                          ? "border-b-4 text-slate-600"
                          : "transition-colors border-transparent hover:text-slate-900"
                        }`
                      }
                    >
                      Wishlist
                    </NavLink>


                    <NavLink
                      to="/dashboard/restaurants/tried"
                      className={({isActive}) =>
                        `flex items-center gap-2 px-4 py-3 border-b-2 text-slate-600 ${
                          isActive
                          ? "border-b-4 text-slate-600"
                          : "transition-colors border-transparent hover:text-slate-900"
                        }`
                      }
                    >
                      Tried
                    </NavLink>

                    </div>
                )}

                  {/* 
                    <NavLink
                      to="/dashboard/restaurants/add"
                      className="flex items-center gap-2 px-4 py-3 border-b-2 transition-colors border-transparent text-slate-600 hover:text-slate-900"
                    >
                      AddNewRestaurant
                    </NavLink>
                     */}

                    {isMyEvents && (
                  <div className="flex gap-2 border-b border-slate-200">
                    <NavLink
                      to="/dashboard/events/created_events"
                      className={({isActive}) =>
                        `flex items-center gap-2 px-4 py-3 border-b-2 text-slate-600 ${
                          isActive
                          ? "border-b-4 text-slate-600"
                          : "transition-colors border-transparent hover:text-slate-900"
                        }`
                      }
                    >
                      Created Events
                    </NavLink>


                    <NavLink
                      to="/dashboard/events/invited"
                      className={({isActive}) =>
                        `flex items-center gap-2 px-4 py-3 border-b-2 text-slate-600 ${
                          isActive
                          ? "border-b-4 text-slate-600"
                          : "transition-colors border-transparent hover:text-slate-900"
                        }`
                      }
                    >
                      Invited
                    </NavLink>


                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}