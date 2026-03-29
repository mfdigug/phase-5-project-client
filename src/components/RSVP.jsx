import { useState } from "react";

const RSVP = ({ MyEP, myRSVPStatus, updateRSVP }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col gap-2 mt-4 w-full items-center">
      {isEditing || !myRSVPStatus ? (
        <div className="flex gap-4 justify-center w-full">
          <button
            onClick={() => updateRSVP(MyEP.id, "accepted")}
            className="px-3 py-1 text-xs rounded-md border transition-all duration-200 active:scale-95 border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/10"
          >
            Accept
          </button>

          <button
            onClick={() => updateRSVP(MyEP.id, "declined")}
            className="px-3 py-1 text-xs rounded-md border transition-all duration-200 active:scale-95 border-red-500/20 text-red-300 hover:bg-red-500/10"
          >
            Decline
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 text-center w-full items-center">
          <span className="text-slate-300 text-xs font-medium">
            Your RSVP:
            <span className="text-white font-semibold ml-1">
              {myRSVPStatus === "accepted" ? "Accepted" : "Declined"}
            </span>
          </span>

          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-xs rounded-md border border-slate-500/20 text-slate-400 hover:bg-slate-500/10 transition-all duration-200 active:scale-95"
          >
            Edit your response
          </button>
        </div>
      )}
    </div>
  );
};

export default RSVP;