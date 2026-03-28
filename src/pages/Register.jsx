import { useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext"

const Register = () => {

  const { register, login, user } = useAuth();
  const navigate = useNavigate()

  const handleGoogleLogin = () => {
    window.location.href = "https://phase-5-project-server.onrender.com/login/google"
  }

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);


  const formSchema = yup.object().shape({
    username: yup
    .string()
    .required("Username required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username can't exceed 20 characters")
    .matches(/^[a-zA-Z0-9_.]+$/, "Username can only contian letters, numbers, underscores and periods"),


    email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email address"),


    password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must have at least one uppercase letter")
    .matches(/[a-z]/, "Password must have at least one lowercase letter")
    .matches(/[0-9]/, "Password must have at least one number")
    .matches(/[@$!%*?&]/, "Password must have at least one special character"),

    confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
});


    
const formik = useFormik({
initialValues: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    className="flex flex-col gap-4 p-6 max-w-md mx-auto">
        <h1   
            className="
            font-italiana
            text-5xl
            text-center 
            text-[#F5EDE6] 
            tracking-wide
            mb-4 
            ">
                DinnerDecider
        </h1>

        <div className="flex flex-col">
            
            <label className="
            mb-1 
            text-sm font-medium font-opensans
            ">
                Username
            </label>

            <input
            type="text"
            name="username"
            autoComplete="username"
            className="
            font-opensans
            border border-[#EFE4D8] 
            rounded px-3 py-2 
            bg-[#7A0000]/20
            text-[#F5EDE6] 
            focus:outline-none 
            focus:ring-3 
            focus:ring-[#EFE4D8]/40
            focus:ring-offset-0
            transition-all duration-200"
            placeholder="Enter a unique username"
            onChange={formik.handleChange}
            value={formik.values.username}
            />

            {formik.touched.username && formik.errors.username && (
            <p className="text-[#FFA69E] font-light mt-2 drop-shadow-[0_0_3px_rgba(255,139,128,0.2)] text-sm">  
                {formik.errors.username}
            </p>
            )}
       
        </div>

        <div className="flex flex-col">

            <label className="mb-1 text-sm font-medium font-opensans">
                Email
            </label>
            <input
            type="text"
            name="email"
            autoComplete="email"
            className="font-opensans
            border border-[#EFE4D8] 
            rounded px-3 py-2 
            bg-[#7A0000]/20
            text-[#F5EDE6] 
            focus:outline-none 
            focus:ring-3 
            focus:ring-[#EFE4D8]/40
            focus:ring-offset-0
            transition-all duration-200"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter your email"
            />
            
            {formik.touched.email && formik.errors.email && (
            <p className="text-[#FFA69E] font-light mt-2 drop-shadow-[0_0_3px_rgba(255,139,128,0.2)] text-sm">  
                {formik.errors.email}
            </p>
            )}
       
        </div>
        
        <div className="flex flex-col">

            <label className="
            mb-1 
            text-sm font-medium font-opensans">
                Password
            </label>

            <input
            type="password"
            name="password"
            autoComplete="new-password"
            className="font-opensans
                border border-[#EFE4D8] 
                rounded px-3 py-2 
                bg-[#7A0000]/20
                text-[#F5EDE6] 
                focus:outline-none 
                focus:ring-3 
                focus:ring-[#EFE4D8]/40
                focus:ring-offset-0
                transition-all duration-200"
            onChange={formik.handleChange}
            value={formik.values.password}
            />
            
            {formik.touched.password && formik.errors.password && (
            <p className="text-[#FFA69E] font-light mt-2 drop-shadow-[0_0_3px_rgba(255,139,128,0.2)] text-sm">  
                {formik.errors.password}
            </p>
            )}
        
        </div>

        <div className="flex flex-col">

            <label className="mb-1 text-sm font-medium font-opensans">
                Confirm password
            </label>
            <input
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            className="font-opensans
            border border-[#EFE4D8] 
            rounded px-3 py-2 
            bg-[#7A0000]/20
            text-[#F5EDE6] 
            focus:outline-none 
            focus:ring-3 
            focus:ring-[#EFE4D8]/40
            focus:ring-offset-0
            transition-all duration-200"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            />
            
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-[#FFA69E] font-light mt-2 drop-shadow-[0_0_3px_rgba(255,139,128,0.2)] text-sm">  
                {formik.errors.confirmPassword}
            </p>
            )}
        
        </div>

        {formik.errors.submit && (
          <p className="text-[#FFA69E] text-sm text-center mt-2">
            {formik.errors.submit}
        </p>
        )}

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

            transition-all duration-200"
        >
            Register
        </button>

    <div className="mt-6 text-center flex flex-col gap-3">


        <p className="font-opensans text-sm text-[#EFE4D8]">
            Already have an account? {' '}
            <NavLink 
                to="/login"
                className="
                font-opensans
                text-[#F5EDE6] font-semibold 
                hover:text-[#FFDEE0] 
                hover:underline 
                transition-colors duration-200"
            >
                Login
            </NavLink>
        </p>
        
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

    </div>

    </form>
  )
}

export default Register