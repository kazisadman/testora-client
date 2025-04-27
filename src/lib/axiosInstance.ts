import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://testora-server.vercel.app/api/v1",
  withCredentials: true,
});
export default axiosInstance;
