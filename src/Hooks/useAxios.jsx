import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://task-management-server-rm2s.onrender.com",
});

const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
