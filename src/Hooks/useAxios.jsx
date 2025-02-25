import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://task-management-server-xi-coral.vercel.app",
});

const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
