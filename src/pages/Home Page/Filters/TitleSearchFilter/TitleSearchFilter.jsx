import React, { useState, useRef, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";

export const TitleSearchFilter = ({ jobTitles, onSelect, value }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [filteredTitles, setFilteredTitles] = useState(jobTitles);
  const ref = useRef(null);

  useEffect(() => {
    setFilteredTitles(jobTitles);
  }, [jobTitles]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredTitles(jobTitles);
    } else {
      const filtered = jobTitles.filter((title) =>
        title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredTitles(filtered);
    }
  };

  const handleSelect = (title) => {
    onSelect(title);
    setSearchTerm(title);
    setShowDropdown(false);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="w-full relative border-r-2" ref={ref}>
      <div className="flex items-center rounded-md relative">
        <IoSearchOutline className="absolute left-3 text-gray-500 text-[21px]" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setShowDropdown(true)}
          className="py-3 pl-10 pr-10 w-full rounded-md border-none focus:outline-none"
          placeholder="Search By Job Title, Role"
        />

        {searchTerm && (
          <IoCloseOutline
            className="absolute right-3 text-gray-500 text-[20px] cursor-pointer"
            onClick={() => {
              setSearchTerm("");
              setFilteredTitles(jobTitles);
              onSelect("");
            }}
          />
        )}
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            transition={{ duration: 0.2 }}
            className="absolute mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-y-auto"
          >
            {filteredTitles.length > 0 ? (
              filteredTitles.map((title, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(title)}
                >
                  {title}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No matching titles</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
