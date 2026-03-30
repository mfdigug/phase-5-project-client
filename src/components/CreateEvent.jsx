import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";

const CreateEvent = () => {

  const navigate = useNavigate();
  const { createEvent } = useEvents() 
  const { user } = useAuth();
  
  // states for user suggestions in invitee input
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inviteeInputRef = useRef();

  const formSchema = yup.object().shape({
    title: yup.string().required("Name required"),
    date: yup.string().required("Please select a date and time"),
    cuisine_filter: yup.string().required("Cuisine required"),
    location_filter: yup.string().required("Location required"),
    price_filter: yup.string().required("Select a price category"),
    invitees: yup.array().of(yup.string().trim().min(1)).min(1, "Add at least one invitee").required()
});

  const priceMap = {
    $: 1,
    $$: 2,
    $$$: 3,
    $$$$: 4,
    $$$$$: 5,
  }


  const formik = useFormik({
    initialValues: {
        title: "",
        date: "",
        cuisine_filter: "",
        location_filter: "",
        price_filter: "",
        invitees: [],
        inviteesInput: ""
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
        const payload = {
            ...values,
            price_filter: priceMap[values.price_filter],
            created_by: user.id,
            invitees: values.invitees
        };
        try {
            await createEvent(payload);
            formik.resetForm();
            navigate("/dashboard/events/created_events");
        } catch (err) {
            console.error(err)
        }   
    }
    })


    //autocomplete fetch existing users
     useEffect(() => {
    if (!formik.values.inviteesInput) return;

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users?search=${formik.values.inviteesInput}`);
        if (res.ok) {
          const data = await res.json();
          setUserSuggestions(data.filter(u => !formik.values.invitees.includes(u.username)));
        }
      } catch (err) {
        console.error("Failed to fetch user suggestions", err);
      }
    }
    fetchSuggestions();
  }, [formik.values.inviteesInput, formik.values.invitees]);

  const handleSuggestionClick = (username) => {
    formik.setFieldValue("invitees", [...formik.values.invitees, username]);
    formik.setFieldValue("inviteesInput", "");
    setUserSuggestions([]);
    inviteeInputRef.current.focus();
  }

  
    return (
    <form 
    onSubmit={formik.handleSubmit}
    className="max-w-md mx-auto 
    mt-6 
    bg-gradient-to-br from-slate-500/60 to-slate-700/80 p-6 
    rounded-xl 
    space-y-6 
    font-opensans 
    shadow-[0_3px_6px_rgba(237,145,158,0.18),0_8px_20px_rgba(237,145,158,0.25)]">
        <h2 className="text-2xl font-antic tracking-wider font-semibold text-slate-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            Create a New Event
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <label className="block text-sm font-medium text-slate-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] self-center">
                Title
            </label>
            <input
            type="text"
            name="title"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="e.g. Birthday Party"
            onChange={formik.handleChange}
            value={formik.values.title}
            />
            
            <p className="text-rose-300 text-sm min-h-[18px] mt-1"> {formik.errors.title}</p>
       
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <label className="block text-sm font-medium text-slate-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] self-center">
                Date & Time
            </label>
            <input
            type="datetime-local"
            name="date"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            onChange={formik.handleChange}
            value={formik.values.date}
            />
            
            <p className="text-rose-300 text-sm min-h-[18px] mt-1"> {formik.errors.date}</p>
       
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <label className="block text-sm font-medium text-slate-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] self-center">
                Preferred cuisine:
            </label>
            <input
            type="text"
            name="cuisine_filter"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="e.g. Chinese"
            onChange={formik.handleChange}
            value={formik.values.cuisine_filter}
            />
            
            <p className="text-rose-390 text-sm min-h-[18px] mt-1"> {formik.errors.cuisine_filter}</p>
        
        </div>
   
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
            <label className="block text-sm font-medium text-slate-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] self-center">
                Desired location:
            </label>
            <input
            type="text"
            name="location_filter"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Suburb"
            onChange={formik.handleChange}
            value={formik.values.location_filter}
            />
        
           <p className="text-rose-300 text-sm min-h-[18px] mt-1"> {formik.errors.location_filter}</p>
        
        </div>

        

        <div className="grid grid-cols-2 items-start gap-4">
        
            <label className="block text-sm font-medium text-slate-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] self-start">
                Select a price category:
            </label>

            <div className="space-y-2">
                {["$", "$$", "$$$", "$$$$", "$$$$$"].map((price) => (
                    <label key={price} className="flex items-center gap-2 cursor-pointer">
                        <input
                         type="radio"
                         name="price_filter"
                         value={price}
                         onChange={formik.handleChange}
                         checked={formik.values.price_filter === price}
                         className="text-slate-200 focus:ring-teal-400" 
                        
                        />
                        <span className="text-slate-200">{price}</span>

                    </label>
                    
                ))} 
        
                 <p className="text-rose-300 text-sm min-h-[18px] mt-1">
                    {formik.errors.price_filter}
                </p>

            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-sm font-medium text-slate-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] self-center">
                Invite other users:
            </label>
            <div className="relative w-full">
 
  <input
    type="text"
    ref={inviteeInputRef}
    name="inviteesInput"
    placeholder="Enter usernames"
    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
    value={formik.values.inviteesInput || ""}
    onChange={(e) => {
      formik.setFieldValue("inviteesInput", e.target.value);
      setShowSuggestions(true);
    }}
    onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
  />

 
  {showSuggestions && userSuggestions.length > 0 && (
    <ul className="absolute left-0 top-full z-10 bg-slate-700 border border-slate-500 w-full mt-1 rounded shadow-lg max-h-40 overflow-y-auto text-slate-200 text-sm">
      {userSuggestions.map(user => (
        <li
          key={user.id}
          className="px-2 py-1 cursor-pointer hover:bg-slate-600"
          onMouseDown={() => handleSuggestionClick(user.username)}
        >
          {user.username}
        </li>
      ))}
    </ul>
  )}

 
  <div className="flex flex-wrap gap-2 mt-1">
    {formik.values.invitees.map(username => (
      <span
        key={username}
        className="bg-teal-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1"
      >
        {username}
        <button
          type="button"
          onClick={() =>
            formik.setFieldValue(
              "invitees",
              formik.values.invitees.filter(u => u !== username)
            )
          }
        >
          ×
        </button>
      </span>
    ))}
  </div>
</div>

        <p className="text-rose-300 text-sm min-h-[18px] mt-1">
            {formik.errors.invitees}
        </p>


        </div>
    
        <button 
        type="submit"
        className="
        w-full py-2.5 
        rounded-lg 
        text-white font-medium
        bg-gradient-to-br from-slate-700 via-slate-600/60 to-red-800/40
        shadow-lg

        hover:from-slate-700 hover:to-teal-600
        active:scale-[0.98] transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-slate-200/70 focus:ring-offset-0"
        >
            Submit
        </button>

    </form>
  )
}

export default CreateEvent