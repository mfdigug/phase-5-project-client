import React, { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext'
import { useNavigate, NavLink, useLocation } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { login } = useAuth()
  const navigate = useNavigate();
  const location = useLocation()
  
  const handleGoogleLogin = () => {
    window.location.href = "https://phase-5-project-server.onrender.com/api/google_login"
  }

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  if (params.get("oauth") === "success") {
    // fetch session from backend via proxy
    const checkSession = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/check_session`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data); // update auth context
        navigate("/dashboard");
      }
    };
    checkSession();
  }
}, [location.search]);

  


  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setErrors([err.message])
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 max-w-md mx-auto">
        
      <div className="flex flex-col">
        <label 
          htmlFor="email"
          className="mb-1 text-sm font-medium"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col">
        <label 
          htmlFor="password"
          className="mb-1 text-sm font-medium"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>
      
        <button 
          type="submit"
          className="mt-2 bg-teal-500 text-white py-2 rounded hover:bg-teal-600"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>

        <p>Don't have an account?</p>
        <NavLink 
        to="/register"
        >
          Register
        </NavLink>

        <div>

        <button 
        type="button"
        onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        </div>

      
    </form>
  );
}

export default Login;
