import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export const ScrollToTopArrow = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showArrow) return null;

  console.log(window.scrollY);

  return (
    <div
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed animate-bounce z-50 bottom-10 right-10 w-12 h-12 flex items-center justify-center text-2xl rounded-full shadow-lg border-2 cursor-pointer transition-all duration-300 hover:opacity-90"
      style={{
        background: "linear-gradient(180deg, #A128FF 0%, #6100AD 113.79%)",
        borderColor: "transparent",
      }}
    >
      <FaArrowUp className="text-white" />
    </div>
  );
};
