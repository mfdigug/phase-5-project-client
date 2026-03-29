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
    <header className="
    bg-[#020617]/40 
    border-b 
    border-slate-800/60 
    backdrop-blur-md 
    sticky top-0 z-10">
            
      <div className="
      max-w-7xl 
      mx-auto 
      px-4 
      sm:px-6 
      lg:px-8
      ">
        
        <div className="
          flex justify-between items-start md:items-center
          py-4 md:py-6
          gap-4
          relative"> 
                    
          <div className="flex flex-col gap-3 min-w-0">
            
            <h1   
              className="
              font-italiana
              text-3xl sm:text-4xl md:text-5xl
              text-[#FDF2F2]/80 
              tracking-wide
              md:absolute md:left-1/2 md:transform md:-translate-x-1/2
              "
              style={{ textShadow: "0 0 6px rgba(239,68,68,0.5)" }}
              >
                DinnerDecider
              </h1>

            <div className="flex items-start w-full mt-2">
              <div className="flex flex-col items-start gap-1 mr-4">
                <span className="
                  text-sm
                  uppercase 
                  tracking-widest 
                  text-slate-400
                  ml-2
                  mb-2
                ">
                  Signed in as
                </span>
                
                <span className="
                  font-italiana
                  text-2xl
                  text-[#F5EDE6]
                  tracking-wide
                  ml-2
                "
                style={{
                  textShadow: `
                    0 0 3px rgba(239,68,68,0.6),
                    0 0 8px rgba(239,68,68,0.3)
                  `
                }}
                >
                  {user?.username}
                </span>
              

                <button
                  onClick={handleLogoutClick}
                  className="
                    text-xs 
                    px-2 py-0.5 
                    rounded 
                    text-slate-400 
                    hover:text-[#FFDEE0] 
                    hover:shadow-[0_0_4px_rgba(195,71,41,0.5)]
                    transition
                  "
                >
                  Logout
                </button>
            </div>
          </div>
        </div>




        <nav className="flex flex-col 
          items-end 
          gap-2 
          max-w-[60%]
          mt-10">
          <div className="flex gap-2 md:gap-4 flex-shrink-0">

            <NavLink
              to="/dashboard/restaurants"
              className={({ isActive }) =>
                `relative px-3 md:px-4 py-2 rounded-lg text-sm md:text-base ${
                  isActive
                    ? "text-[#ECC8AF]"
                    : "text-slate-300 hover:bg-[#C34729]/20 hover:text-white"}
                  transition-all duration-300}`
                }
            >
             {({ isActive }) => (
              <>
                My Restaurants
                <span className={`
                  absolute left-0 bottom-0 h-[2px] w-full transition-all duration-300
                  ${isActive ? "bg-[#C34729]" : "bg-transparent"}
                `} />
              </>
            )}
            </NavLink>

            <NavLink
              to="/dashboard/events"
              className={({ isActive }) =>
                `relative px-3 md:px-4 py-2 rounded-lg text-sm md:text-base ${
                  isActive
                    ? "text-[#ECC8AF]"
                    : "text-slate-300 hover:bg-[#C34729]/20 hover:text-white"}
                  transition-all duration-300}`
              }
            >
              {({ isActive }) => (
              <>
                My Events
                <span className={`
                  absolute left-0 bottom-0 h-[2px] w-full transition-all duration-300
                  ${isActive ? "bg-[#C34729]" : "bg-transparent"}
                `} />
              </>
            )}
            </NavLink>
          
          </div>

          <div className="min-h-[40px] w-full">
            
            {isMyRestaurants && (
              <div className="flex gap-2 
                justify-end 
                flex-shrink-0
                mt-4">
                <NavLink
                  to="/dashboard/restaurants/wishlist"
                  className={({ isActive }) => `
                    px-3 py-2 text-xs rounded-md
                    ${isActive
                      ? "bg-[#C34729]/10 text-white shadow-[0_0_4px_rgba(195,71,41,0.5)]"
                      : "text-slate-400 hover:bg-[#C34729]/10 hover:text-white"}
                    transition-all duration-200
                  `}
                >
                  Wishlist
                </NavLink>


                <NavLink
                  to="/dashboard/restaurants/tried"
                  className={({ isActive }) => `
                    px-3 py-2 text-xs rounded-md
                    ${isActive
                      ? "bg-[#C34729]/10 text-white shadow-[0_0_4px_rgba(195,71,41,0.5)]"
                      : "text-slate-400 hover:bg-[#C34729]/10 hover:text-white"}
                    transition-all duration-200
                  `}
                >
                  Tried
                </NavLink>

                </div>
            )}

            {isMyEvents && (
              <div className="flex gap-2 
                justify-end 
                flex-shrink-0
                mt-4">
                <NavLink
                  to="/dashboard/events/created_events"
                  className={({ isActive }) => `
                    px-3 py-2 text-xs rounded-md
                    ${isActive
                      ? "bg-[#C34729]/10 text-white shadow-[0_0_4px_rgba(195,71,41,0.5)]"
                      : "text-slate-400 hover:bg-[#C34729]/10 hover:text-white"}
                    transition-all duration-200
                  `}
                >
                  Created Events
                </NavLink>


                <NavLink
                  to="/dashboard/events/invited"
                  className={({ isActive }) => `
                    px-3 py-2 text-xs rounded-md
                    ${isActive
                      ? "bg-[#C34729]/10 text-white shadow-[0_0_4px_rgba(195,71,41,0.5)]"
                      : "text-slate-400 hover:bg-[#C34729]/10 hover:text-white"}
                    transition-all duration-200
                  `}
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
  );
}