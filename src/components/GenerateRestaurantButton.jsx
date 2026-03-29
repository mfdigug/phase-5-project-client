const GenerateRestaurantButton = ({ eventId, generateRestaurant }) => {
  return (
    <button
      onClick={() => generateRestaurant(eventId)}
      className="
        w-full sm:w-auto px-6 py-2 text-sm uppercase tracking-widest text-white/80
        rounded-lg bg-gradient-to-r from-slate-700/60 to-slate-600/60
        shadow-[0_0_6px_2px_rgba(20,184,166,0.4)]
        hover:shadow-[0_0_12px_4px_rgba(20,184,166,0.7)]
        transition-all duration-200 active:scale-95
      "
      style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
    >
      Generate Restaurant
    </button>
  );
};

export default GenerateRestaurantButton;