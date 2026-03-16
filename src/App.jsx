import { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("/api/restaurants")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
  <div className="min-h-screen bg-slate-200 text-slate-600 overflow-hidden">
    my page
    </div>
  );
}

export default App;
