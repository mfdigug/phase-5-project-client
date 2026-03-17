 import { NavLink } from 'react-router-dom'
 
 export default function NavBar() {
  

  return (
    <div>
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-[120px]">
                <div className="flex items-center gap-2">
                <h1 className="text-3xl font-semibold text-teal-900">
                    Dinner Decider
                </h1>
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
                  to="dashboard/events"
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

              {/* <div className="flex gap-2 mt-2 min-h-[40px]">
                {isProfile && (
                  <div className="flex gap-2 border-b border-slate-200">
                    <NavLink
                      to="/userprofile/mybooks"
                      className="flex items-center gap-2 px-4 py-3 border-b-2 transition-colors border-transparent text-slate-600 hover:text-slate-900"
                    >
                      My Books
                    </NavLink>
                    <NavLink
                      to="/userprofile/requestedbooks"
                      className="flex items-center gap-2 px-4 py-3 border-b-2 transition-colors border-transparent text-slate-600 hover:text-slate-900"
                    >
                      Requested Books
                    </NavLink>
                    <NavLink
                      to="/userprofile/pendingrequests"
                      className="flex items-center gap-2 px-4 py-3 border-b-2 transition-colors border-transparent text-slate-600 hover:text-slate-900"
                    >
                      Pending Requests
                    </NavLink>
                  </div>
                )}
              </div> */}
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}