import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import UserDashboard from './pages/UserDashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import { useRestaurants } from './hooks/useRestaurants'



function App() {
  const isLoggedIn = true;
  const { restaurants, setRestaurants } = useRestaurants();

  return (
  <div className="min-h-screen bg-slate-200 text-teal-600 overflow-hidden">
    <Routes>
    
      <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
    
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/*" element={<UserDashboard restaurants={restaurants}/>} />
    
    </Routes>    
  
  </div>
  );
}

export default App;
