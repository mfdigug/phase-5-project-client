import NavBar from '../components/NavBar'
import { Outlet } from "react-router-dom"

const UserDashboard = () => {
  
  return (
    <div>

          <NavBar />
          <Outlet />
          
      </div>
  )
}

export default UserDashboard