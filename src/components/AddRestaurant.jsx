import React from 'react'

const AddRestaurant = () => {
  return (
    <form className="max-w-md mx-auto mt-6 bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-semibold text-slate-700">
            Add a New Restaurant
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <label className="block text-sm font-medium text-slate-600 self-center">
                Name
            </label>
            <input
            type="text"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Restaurant name"
            />
       

       
            <label className="block text-sm font-medium text-slate-600 self-center">
                Cuisine
            </label>
            <input
            type="text"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline=-none focus:ring-2 focus:ring-teal-400"
            placeholder="e.g. Italian"
            />
   

      
            <label className="block text-sm font-medium text-slate-600 self-center">
                Location
            </label>
            <input
            type="text"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline=-none focus:ring-2 focus:ring-teal-400"
            placeholder="Suburb"
            />
     

        
            <label className="block text-sm font-medium text-slate-600 self-start">
                Price Range
            </label>

            <div className="space-y-2">
                {["$", "$$", "$$$", "$$$$", "$$$$$"].map((price) => (
                    <label key={price} className="flex items-center gap-2 cursor-pointer">
                        <input
                         type="radio"
                         name="price"
                         value={price}
                         className="text-teal-500 focus:ring-teal-400" 
                        />
                        <span className="text-slate-700">{price}</span>

                    </label>
                ))} 

            </div>
        </div>

    </form>
  )
}

export default AddRestaurant