import React from "react";
import Banner from "./Banner";
import { Outlet } from "react-router-dom";
import NavBar from "@/Shared/NavBar";

const Main = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="pt-[74px] bg-gradient-to-t from-blue-900 to-gray-900 min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
