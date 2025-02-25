import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/Provider/AuthProvider";
import useAxios from "@/Hooks/useAxios";

const GoggleLogin = ({ closeModal }) => {
  const { signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    const axiosPublic = useAxios();
    signInWithGoogle()
      .then((res) => {
        navigate(location?.state ? location.state : "/tasks");
        toast.success("Login Successfully");

        const userInfo = {
          email: res.user.email,
          name: res.user.displayName,
        };

        axiosPublic
          .post("/users", userInfo)
          .then((res) => {})
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((err) => {
        toast.error("login", { type: "manual", message: err.message }); //
      });
  };

  return (
    <div>
      {/* Goggle */}
      <div className="flex items-center justify-center pb-1">
        <button
          onClick={handleGoogleSignIn}
          className="flex text-center items-center btn text-xl  rounded-lg w-full bg-white border-2 border-[#023E8A] text-[#023E8A]"
        >
          <FcGoogle></FcGoogle>
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default GoggleLogin;
