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

function App() {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  
  return (
  <div className="min-h-screen bg-slate-200 text-teal-600 overflow-hidden">
    <Routes>
    
      <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard/restaurants/wishlist" /> : <Navigate to="/login" />
          }
        />
    
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/dashboard" element={isLoggedIn ? <UserDashboard /> : <Navigate to="/login" />} >

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
      </Route>


      </Route>
    
    </Routes>    
  
  </div>
  );
}

export default App;
