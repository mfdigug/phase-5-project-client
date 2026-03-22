import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";


const CreateEvent = () => {

  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState([{}]);
  const [refreshPage, setRefreshPage] = useState(false);
  const { addEvent } = useEvents() 
  const { user } = useAuth();
  
  const formSchema = yup.object().shape({
    title: yup.string().required("Name required"),
    date: yup.string().required("Please select a date and time"),
    cuisine_filter: yup.string().required("Cuisine required"),
    location_filter: yup.string().required("Location required"),
    price_filter: yup.string().required("Select a price category"),
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
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
        const payload = {
            ...values,
            price_range: priceMap[values.price_range],
            //participants?
        };
        console.log("FINAL PAYLOAD:", payload)
    }
    })

            // try {
        //     await addEvent(payload);
        //     console.log("FINAL PAYLOAD:", payload)
        //     formik.resetForm();
        //     navigate("/dashboard/events/created_events");
        // } catch (err) {
        //     console.error(err)
        // }   

  
  
    return (
    <form 
    onSubmit={formik.handleSubmit}
    className="max-w-md mx-auto mt-6 bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-2xl font-semibold text-slate-700">
            Create a New Event
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <label className="block text-sm font-medium text-slate-600 self-center">
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
            
            <p className="text-red-400 text-sm min-h-[18px] mt-1"> {formik.errors.title}</p>
       
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <label className="block text-sm font-medium text-slate-600 self-center">
                Date & Time
            </label>
            <input
            type="datetime-local"
            name="date"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            onChange={formik.handleChange}
            value={formik.values.date}
            />
            
            <p className="text-red-400 text-sm min-h-[18px] mt-1"> {formik.errors.date}</p>
       
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <label className="block text-sm font-medium text-slate-600 self-center">
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
            
            <p className="text-red-400 text-sm min-h-[18px] mt-1"> {formik.errors.cuisine}</p>
        
        </div>
   
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
            <label className="block text-sm font-medium text-slate-600 self-center">
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
        
           <p className="text-red-400 text-sm min-h-[18px] mt-1"> {formik.errors.location}</p>
        
        </div>

        

        <div className="grid grid-cols-2 items-start gap-4">
        
            <label className="block text-sm font-medium text-slate-600 self-start">
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
                         className="text-teal-500 focus:ring-teal-400" 
                        
                        />
                        <span className="text-slate-700">{price}</span>

                    </label>
                    
                ))} 
        
                 <p className="text-red-400 text-sm min-h-[18px] mt-1">
                    {formik.errors.price_filter}
                </p>

            </div>
        </div>
    
    <button 
    type="submit"
    className="w-full bg-teal-500 text-white font-medium py-2.5 rounded-lg mt-4
           hover:bg-teal-600 active:scale-[0.98] transition-all duration-150
           focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
    >
        Submit
    </button>

    </form>
  )
}

export default CreateEvent