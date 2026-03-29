import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext'
import { useNavigate, NavLink, useLocation } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { login, user } = useAuth()
  
  const navigate = useNavigate();
  const location = useLocation()
  
  // const handleGoogleLogin = () => {
  //   window.location.href = "https://phase-5-project-server.onrender.com/api/google_login"
  // }

   useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

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

      <h1   
      className="
      font-italiana
      text-5xl
      text-center 
      text-[#F5EDE6] 
      tracking-wide 
      ">
        DinnerDecider
      </h1>

      <div className="flex flex-col">
        
        <label 
          htmlFor="email"
          className="mb-1 text-sm font-medium font-opensans"
        >
          Email
        </label>

        <input
          type="text"
          id="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
          font-opensans
          border border-[#EFE4D8] 
          rounded px-3 py-2 
          bg-[#7A0000]/40
          text-[#F5EDE6] 
          focus:outline-none 
          focus:ring-3 
          focus:ring-[#EFE4D8]/40
          focus:ring-offset-0
          transition-all duration-200"
        />
      </div>

      <div className="flex flex-col">
        <label 
          htmlFor="password"
          className="mb-1 text-sm font-medium font-opensans"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
          font-opensans
          border border-[#EFE4D8] 
          rounded px-3 py-2 
          bg-[#7A0000]/40
          text-[#F5EDE6] 
          focus:outline-none 
          focus:ring-3 
          focus:ring-[#EFE4D8]/40
          focus:ring-offset-0
          transition-all duration-200"
        />
      </div>
      
        <button 
          type="submit"
          className="
          bg-gradient-to-br from-[#F5EDE6] via-[#EFE4D8] to-[#E3D3C3]
          text-[#7A0000]
          font-roboto
          mt-4
          px-5 py-2.5
          rounded
          font-semibold
          shadow-md
          shadow-[0_0_20px_rgba(18,191,191,0.25)]

          hover:shadow-lg
          hover:shadow-[0_0_30px_rgba(18,191,191,0.35)
          hover:scale-[1.02]
          active:scale-[0.98]

          transition-all duration-200
          "
        >
          {isLoading ? "Loading..." : "Login"}
        </button>

        <div className="mt-6 text-center flex flex-col gap-3">

          <p className="font-opensans text-sm text-[#EFE4D8]">
            Don't have an account? {' '}
            <NavLink 
            to="/register"
            className="
            font-opensans
            text-[#F5EDE6] font-semibold 
            hover:text-[#FFDEE0] 
            hover:underline 
            transition-colors duration-200"
            >
              Register
            </NavLink>
          </p>
{/* 
          <span className="font-opensans text-sm text-[#EFE4D8]">or</span>

          <button 
          type="button"
          onClick={handleGoogleLogin}
          className="
          font-opensans
          bg-[#EFE4D8]/10 text-[#F5EDE6] font-semibold
          px-4 py-2 
          rounded
          hover:bg-[#FFDEE0]
          hover:text-[#7A0000]
          transition-color duration-200"
          >
            Continue with Google
          </button>
           */}
      </div>
      
    </form>
  );
}

export default Login;
