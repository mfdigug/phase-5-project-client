import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext"

const Register = () => {

  const { register } = useAuth()
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = "https://phase-5-project-server.onrender.com/login/google"
  }


  const formSchema = yup.object().shape({
    username: yup.string().required("Unique username required"),
    email: yup.string().required("Please enter your email address"),
    password: yup.string().required("Password..."),
    confirmPassword: yup.string().required("Passwords must match")
});
  
   const formik = useFormik({
    initialValues: {
        name: "",
        email: "",
        password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
        try {
            await register(values); 
            formik.resetForm();
        } catch (err) {
            console.error(err)
        }   
    }
    })



  return (
    
    <form 
    onSubmit={formik.handleSubmit}
    className="max-w-md mx-auto mt-6 bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-2xl font-semibold text-slate-700">
            Register
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <label className="block text-sm font-medium text-slate-600 self-center">
                Username
            </label>
            <input
            type="text"
            name="username"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter a unique username"
            onChange={formik.handleChange}
            value={formik.values.username}
            />
            
            <p className="text-red-400 text-sm min-h-[18px] mt-1"> {formik.errors.username}</p>
       
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <label className="block text-sm font-medium text-slate-600 self-center">
                Email
            </label>
            <input
            type="text"
            name="email"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter your email"
            />
            
            <p className="text-red-400 text-sm min-h-[18px] mt-1"> {formik.errors.email}</p>
       
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <label className="block text-sm font-medium text-slate-600 self-center">
                Password
            </label>
            <input
            type="password"
            name="password"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            onChange={formik.handleChange}
            value={formik.values.password}
            />
            
            <p className="text-red-400 text-sm min-h-[18px] mt-1"> {formik.errors.password}</p>
        
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <label className="block text-sm font-medium text-slate-600 self-center">
                Confirm password
            </label>
            <input
            type="password"
            name="confirmPassword"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            />
            
            <p className="text-red-400 text-sm min-h-[18px] mt-1"> {formik.errors.password}</p>
        
        </div>
    
    <button 
    type="submit"
    className="w-full bg-teal-500 text-white font-medium py-2.5 rounded-lg mt-4
           hover:bg-teal-600 active:scale-[0.98] transition-all duration-150
           focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
    >
        Submit
    </button>

    <p>Already have an account?</p>
    <NavLink 
    to="/login"
    >
      Login
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
  )
}

export default Register