import axios from "axios";
let token = sessionStorage.getItem("access_token");

const axiosInstance = axios.create({
  baseURL: "https://run.mocky.io/v3",
  headers: {
    Authorization: token,
  },
});

export default axiosInstance;
