import React from "react";
import { BorderBeam } from "@/components/magicui/border-beam";
import GoggleLogin from "@/Shared/GoogleLogin";
import { NavLink } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative bg-white w-[350px] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <p className="text-gray-600 text-sm text-center mb-4">
          Enter your credentials to access your account.
        </p>

        <GoggleLogin />
        <NavLink to={"/"}>
          <h2 className="text-lg flex font-bold text-center items-center mx-auto justify-center">
            <FaArrowLeft />
            Home
          </h2>
        </NavLink>
        <BorderBeam duration={8} size={100} />
      </div>
    </div>
  );
}

export default SignIn;
