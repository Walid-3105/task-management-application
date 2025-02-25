import { AuthContext } from "@/Provider/AuthProvider";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/"); // Redirect to home
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-4 z-20 bg-opacity-90 bg-gray-900 text-white">
        <NavLink to={"/"}>
          <h1 className="text-xl md:text-2xl font-bold text-white">
            GenZ Task
          </h1>
        </NavLink>

        <div>
          {user && user.email ? (
            <div className="flex gap-3 text-center items-center">
              <NavLink to={"/tasks"}>
                <h3 className="font-bold text-lg md:text-xl">Tasks</h3>
              </NavLink>
              <NavLink to={"/addTask"}>
                <h3 className="font-bold text-lg md:text-xl mr-2 md:mr-3">
                  Add Task
                </h3>
              </NavLink>
              <button
                onClick={handleLogout}
                className="px-3 md:px-5 py-1 md:py-2 text-white border border-gray-300 rounded-md"
              >
                Log Out
              </button>
            </div>
          ) : (
            <NavLink
              to="/signin"
              className="px-3 md:px-5 py-1 md:py-2 text-white border border-gray-300 rounded-md"
            >
              Sign In
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
