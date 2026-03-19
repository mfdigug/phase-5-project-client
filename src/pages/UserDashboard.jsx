import NavBar from '../components/NavBar'
import { useAuth } from "../context/AuthContext"
import { Outlet } from "react-router-dom"

const UserDashboard = () => {
  
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-mist-300 text-teal-950 overflow-hidden">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 mt-8">
          <h1 className="text-4xl font-semibold text-teal-600 mb-2">
                  Welcome {user?.username}
          </h1>
          <NavBar />
          <Outlet />
          
      </div>
    </div>
  )
}

export default UserDashboard