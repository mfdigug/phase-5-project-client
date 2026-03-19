import React, { useState } from "react";
import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth()
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard")
    } catch (err) {
      setErrors([err.message])
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      

      
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      
      
        <button type="submit">
          {isLoading ? "Loading..." : "Login"}
        </button>
      

    </form>
  );
}

export default Login;
