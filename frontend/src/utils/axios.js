import axios from "axios";

 const axiosInstance = axios.create({
    baseURL: "https://blogapp-awss3.onrender.com/", //import.meta.env.BASE_URL,
    withCredentials: true,
  });
  export default axiosInstance;