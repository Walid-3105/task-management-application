import { ShinyButton } from "@/components/magicui/shiny-button";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Banner = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full bg-gradient-to-t from-blue-900 to-gray-900 h-full">
      <div className="flex -mt-[74px] flex-col justify-center items-center h-screen text-center relative z-10 space-y-3">
        <h3 className="text-5xl font-extrabold text-white drop-shadow-lg">
          Task Management System
        </h3>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl">
          Organize, track, and boost productivity with ease.
        </p>

        <NavLink to={"/tasks"}>
          <ShinyButton onClick={() => setIsOpen(true)} className="bg-gray-300">
            Get Started ➜
          </ShinyButton>
        </NavLink>
      </div>
    </div>
  );
};

export default Banner;
