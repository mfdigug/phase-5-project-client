import NavBar from '../components/NavBar'
import { Outlet } from "react-router-dom"

const UserDashboard = () => {
  
  return (
    <div className="
          min-h-screen 
          bg-[#020617] 
          text-[#F5EDE6]  
          relative 
          overflow-hidden">
            
    <div className="
        absolute 
        inset-0 z-0 
        pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(239,68,68,0.4), transparent)`,
        }}
  />

          <NavBar />
          <Outlet />
          
      </div>
  )
}

export default UserDashboard