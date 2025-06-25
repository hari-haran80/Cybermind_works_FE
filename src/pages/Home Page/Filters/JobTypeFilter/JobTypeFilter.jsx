import React, { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { RiUserVoiceLine } from "react-icons/ri";

const jobTypeOptions = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
];

export const JobTypeFilter = ({ onSelect, value }) => {
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
          <RiUserVoiceLine className="mr-5 text-gray-500 text-[18px]" />
          <span className="text-gray-500">{value || "Job Type"}</span>
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
            className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg"
          >
            <>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium"
                onClick={() => {
                  onSelect("");
                  setShowDropdown(false);
                }}
              >
                Show All
              </div>
              {jobTypeOptions.map((option) => (
                <div
                  key={option.value}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onSelect(option.value);
                    setShowDropdown(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
