import { useAuth } from "./context/AuthContext"
import { Routes, Route, Navigate } from "react-router-dom"
import UserDashboard from './pages/UserDashboard'
import Register from './pages/Register'
import Login from './pages/Login'



function App() {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  
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
      <Route path="/dashboard/*" element={isLoggedIn ? <UserDashboard /> : <Navigate to="/login" />} />
    
    </Routes>    
  
  </div>
  );
}

export default App;
