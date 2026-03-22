import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { useRestaurants } from "../context/RestaurantContext";
import { useAuth } from "../context/AuthContext";

const AddRestaurant = () => {
  
  const [newRestaurant, setNewRestaurant] = useState([{}]);
  const [refreshPage, setRefreshPage] = useState(false);
  const { addRestaurant } = useRestaurants() //not written yet
  const { user } = useAuth();
  
  const formSchema = yup.object().shape({
    name: yup.string().required("Name required"),
    cuisine: yup.string().required("Cuisine required"),
    location: yup.string().required("Location required"),
    price_range: yup.string().required("Select a price category"),
   //status & suggested_by hadndled in onsubmit?
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
        name: "",
        cuisine: "",
        location: "",
        price_range: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
        const payload = {
            ...values,
            price_range: priceMap[values.price_range],
            suggested_by: user.id,
            status: "wishlist"
        };
        try {
            await addRestaurant(payload);
            console.log("FINAL PAYLOAD:", payload)
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
            Add a New Restaurant
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <label className="block text-sm font-medium text-slate-600 self-center">
                Name
            </label>
            <input
            type="text"
            name="name"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Restaurant name"
            onChange={formik.handleChange}
            value={formik.values.name}
            />
            
            <p className="text-red-400 text-sm min-h-[18px] mt-1"> {formik.errors.name}</p>
       
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <label className="block text-sm font-medium text-slate-600 self-center">
                Cuisine
            </label>
            <input
            type="text"
            name="cuisine"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="e.g. Italian"
            onChange={formik.handleChange}
            value={formik.values.cuisine}
            />
            
            <p className="text-red-400 text-sm min-h-[18px] mt-1"> {formik.errors.cuisine}</p>
        
        </div>
   
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
            <label className="block text-sm font-medium text-slate-600 self-center">
                Location
            </label>
            <input
            type="text"
            name="location"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Suburb"
            onChange={formik.handleChange}
            value={formik.values.location}
            />
        
           <p className="text-red-400 text-sm min-h-[18px] mt-1"> {formik.errors.location}</p>
        
        </div>

        

        <div className="grid grid-cols-2 items-start gap-4">
        
            <label className="block text-sm font-medium text-slate-600 self-start">
                Price Range
            </label>

            <div className="space-y-2">
                {["$", "$$", "$$$", "$$$$", "$$$$$"].map((price) => (
                    <label key={price} className="flex items-center gap-2 cursor-pointer">
                        <input
                         type="radio"
                         name="price_range"
                         value={price}
                         onChange={formik.handleChange}
                         checked={formik.values.price_range === price}
                         className="text-teal-500 focus:ring-teal-400" 
                        
                        />
                        <span className="text-slate-700">{price}</span>

                    </label>
                    
                ))} 
        
                 <p className="text-red-400 text-sm min-h-[18px] mt-1">
                    {formik.errors.price_range}
                </p>

            </div>
        </div>
    
    <button type="submit">Submit</button>

    </form>
  )
}

export default AddRestaurant