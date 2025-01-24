import axios from "axios";

 const axiosInstance = axios.create({
    baseURL: "http://localhost:8001/", //import.meta.env.BASE_URL,
    withCredentials: true,
  });
  export default axiosInstance;