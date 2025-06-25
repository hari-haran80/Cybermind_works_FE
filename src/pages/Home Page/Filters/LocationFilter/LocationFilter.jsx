import React, { useRef, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

export const LocationFilter = ({ locations, onSelect, value }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="w-full relative border-r-2 pr-5" ref={ref}>
      <div
        className="flex items-center justify-between rounded-md px-4 py-3 cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="flex items-center">
          <CiLocationOn className="mr-5 text-gray-500 text-[21px]" />
          <span className="text-gray-500">{value || "Preferred Location"}</span>
        </div>
        {showDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            transition={{ duration: 0.2 }}
            className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
          >
            <>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium"
                onClick={() => {
                  onSelect("");
                  setShowDropdown(false);
                }}
              >
                All Location
              </div>
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onSelect(location);
                    setShowDropdown(false);
                  }}
                >
                  {location}
                </div>
              ))}
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
