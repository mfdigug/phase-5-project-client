import React from 'react'
import MyRestaurants from './MyRestaurants'
import MyEvents from './MyEvents'
import NavBar from '../components/NavBar'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"

const UserDashboard = () => {
  
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-mist-300 text-teal-950 overflow-hidden">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 mt-8">
          <h1 className="text-4xl font-semibold text-teal-600 mb-2">
                  Welcome User
          </h1>
          <NavBar />
          <Routes>
            <Route index element={<MyRestaurants />} />
            <Route path="restaurants/*" element={<MyRestaurants />} />
            <Route path="events/*" element={<MyEvents />} />
          </Routes>
          
      </div>
    </div>
  )
}

export default UserDashboard