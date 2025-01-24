import axios from "axios";

 const axiosInstance = axios.create({
    baseURL: "http://localhost:8002/", //import.meta.env.BASE_URL,
    withCredentials: true,
  });
  export default axiosInstance;