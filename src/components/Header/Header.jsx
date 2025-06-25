import React, { useState } from "react";
import Logo from "../../assets/images/homepage/Logo.png";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Buttons/Button";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="z-[999] w-full h-[100px] fixed flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-[890px]  p-4 sm:px-6 h-[80px] rounded-[50px] z-40 shadow-[0_2px_6px_0_rgba(0,0,0,0.3)] flex items-center justify-between bg-white">
        <img src={Logo} alt="Logo" className="h-[45px] sm:h-[50px] w-auto" />
        <div className="hidden md:flex gap-2 text-[16px] h-[40px] items-center justify-center font-[600] text-gray-700">
          <a
            href="#"
            className="transition-all duration-100 hover:border-b-2 px-5 py-2 hover:rounded-md hover:mt-1 hover:border-gray-300"
          >
            Home
          </a>
          <a
            href="#"
            className="transition-all duration-100 hover:border-b-2 px-5 py-2 hover:rounded-md hover:mt-1 hover:border-gray-300"
          >
            Find Jobs
          </a>
          <a
            href="#"
            className="transition-all duration-100 hover:border-b-2 px-5 py-2 hover:rounded-md hover:mt-1 hover:border-gray-300"
          >
            Find Talents
          </a>
          <a
            href="#"
            className="transition-all duration-100 hover:border-b-2 px-5 py-2 hover:rounded-md hover:mt-1 hover:border-gray-300"
          >
            About Us
          </a>
          <a
            href="#"
            className="transition-all duration-100 hover:border-b-2 px-5 py-2 hover:rounded-md hover:mt-1 hover:border-gray-300"
          >
            Testimonials
          </a>
        </div>

        <Button />

        <div className="md:hidden ml-4">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[100px] w-[90%] max-w-[890px] bg-white rounded-xl shadow-lg p-6 md:hidden text-center"
          >
            <a href="#" className="block py-3 text-gray-700 hover:text-black">
              Home
            </a>
            <a href="#" className="block py-3 text-gray-700 hover:text-black">
              Find Jobs
            </a>
            <a href="#" className="block py-3 text-gray-700 hover:text-black">
              Find Talents
            </a>
            <a href="#" className="block py-3 text-gray-700 hover:text-black">
              About Us
            </a>
            <a href="#" className="block py-3 text-gray-700 hover:text-black">
              Testimonials
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
