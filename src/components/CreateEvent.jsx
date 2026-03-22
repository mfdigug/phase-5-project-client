import React from 'react'

const CreateEvent = () => {
  return (
    <form className="max-w-md mx-auto mt-6 bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-semibold text-slate-700">
            Create a New Event
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <label className="block text-sm font-medium text-slate-600 self-center">
                Title
            </label>
            <input
            type="text"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="e.g. Birthday dinner"
            />


            <label className="block text-sm font-medium text-slate-600 self-center">
                Date
            </label>

            <input
                type="datetime-local"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
       

       
            <label className="block text-sm font-medium text-slate-600 self-center">
                Cuisine Filter
            </label>
            <input
            type="text"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline=-none focus:ring-2 focus:ring-teal-400"
            placeholder="e.g. Chinese"
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

export default CreateEvent