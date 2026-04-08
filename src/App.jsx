import { useAuth } from "./context/AuthContext"
import { Routes, Route, Navigate } from "react-router-dom"

import UserDashboard from './pages/UserDashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import MyRestaurants from "./pages/MyRestaurants";
import MyEvents from "./pages/MyEvents";
import Wishlist from "./components/Wishlist";
import Tried from "./components/Tried";
import CreatedEvents from "./components/CreatedEvents";
import Invited from "./components/Invited";
import AddRestaurant from "./components/AddRestaurant"
import CreateEvent from "./components/CreateEvent"

function App() {
  const { user, isChecking } = useAuth();
  const isLoggedIn = !!user;
  
  if (isChecking) return <div className="min-h-screen bg-[#020617] text-[#F5EDE6] flex flex-col items-center justify-center font-semibold space-y-4 relative overflow-hidden"
  >

    <div
    className="
      absolute 
      inset-0 z-0 
      pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(239,68,68,0.4), transparent)`,
      }}
  />
  
    <p>Please wait while the server loads.</p>
    <p>
      <a
        href="https://youtu.be/BIpvjqThPIo"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline hover:text-blue-300 transition"
      >
        Watch
      </a>{" "}
       how this app works while you wait.
    </p>

  </div>;

  return (
  <div className="
    min-h-screen 
    bg-[#020617] 
    text-[#F5EDE6]  
    relative 
    overflow-hidden">
    
    <div
    className="
      absolute 
      inset-0 z-0 
      pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(239,68,68,0.4), transparent)`,
      }}
  />

    <Routes>

      <Route 
        path="/" 
        element={
          isLoggedIn 
            ? <Navigate to="/dashboard" /> 
            : <Navigate to="/login" />
        } 
      />
      
    
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={ <Login />} />
      
      <Route path="/dashboard" element={isLoggedIn 
      ? <UserDashboard /> 
      : <Navigate to="/login" />
      } >

      <Route path="restaurants" element={<MyRestaurants />}>
        <Route index element={<Wishlist />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="tried" element={<Tried />} />
        <Route path="add_restaurant" element={<AddRestaurant />} />
      </Route>

      <Route path="events" element={<MyEvents />}>
        <Route index element={<CreatedEvents />} />
        <Route path="created_events" element={<CreatedEvents />} />
        <Route path="invited" element={<Invited />} />
        <Route path="create_event" element={<CreateEvent />} />
      </Route>


      </Route>
    
    </Routes>    

  
    </div>
  
  );
}

export default App;
