import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CreateJobPopup } from "../../pages/Home Page/CreateJobPopup/CreateJobPopup";

export const Button = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const portalRoot = document.getElementById("portal-root");

  const tooltip = showTooltip && (
    <div
      className="fixed z-[99999] top-[90px] right-[12%] w-[200px] text-center bg-white border-t-2 border-red-400 text-gray-800 p-3 rounded-lg shadow-lg animate-bounce"
      style={{ animation: "bounce 0.5s infinite alternate" }}
    >
      <div
        className="absolute -top-[10px] left-1/2 transform -translate-x-1/2 w-0 h-0 
                   border-l-[10px] border-r-[10px] border-b-[10px] 
                   border-l-transparent border-r-transparent border-b-red-400"
      ></div>
      <p className="text-sm mb-2">Click here to create job posting</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowTooltip(false);
        }}
        className="bg-purple-600 w-[50%] hover:bg-purple-700 text-white text-xs py-1 px-2 rounded"
      >
        OK
      </button>
      <style jsx>{`
        @keyframes bounce {
          0% {
            transform: translate(-50%, 0);
          }
          100% {
            transform: translate(-50%, -5px);
          }
        }
      `}</style>
    </div>
  );

  const popup = showPopup && (
    <CreateJobPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
  );

  return (
    <>
      <div className="relative group cursor-pointer ml-4">
        <div
          className="bg-[linear-gradient(180deg,_#A128FF_0%,_#6100AD_113.79%)] text-white px-6 py-2 text-sm sm:text-base rounded-full overflow-hidden relative transition-transform duration-300 group-hover:scale-110 text-center"
          onClick={() => setShowPopup(true)}
        >
          <span className="block transition-all duration-300 transform group-hover:-translate-y-[120%]">
            Create Job
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 transform translate-y-full group-hover:translate-y-0">
            Login
          </span>
        </div>
      </div>

      {ReactDOM.createPortal(tooltip, portalRoot)}
      {ReactDOM.createPortal(popup, portalRoot)}
    </>
  );
};
