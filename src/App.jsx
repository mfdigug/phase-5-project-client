import { useState, useEffect } from "react";
import UserDashboard from './pages/UserDashboard'
import NavBar from './components/NavBar'
import { useRestaurants } from './hooks/useRestaurants'



function App() {
  
  const { restaurants, setRestaurants } = useRestaurants();

  return (
  <div className="min-h-screen bg-slate-200 text-teal-600 overflow-hidden">
    <h2>The App</h2>
    <NavBar />
    <UserDashboard restaurants={restaurants}/>

 

    
  
  </div>
  );
}

export default App;
