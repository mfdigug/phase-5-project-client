import React from 'react'
import MyRestaurants from './MyRestaurants'
import MyEvents from './MyEvents'
import { Routes, Route } from 'react-router-dom'

const UserDashboard = ({restaurants}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 mt-8">
          <h1 className="text-4xl font-semibold text-slate-500 mb-2">
                  User Dashboard
          </h1>
          <Routes>
            <Route path="/" element={<MyRestaurants restaurants={restaurants}/>} />
            <Route path="/events" element={<MyEvents />} />

          </Routes>
          
      </div>
    </div>
  )
}

export default UserDashboard