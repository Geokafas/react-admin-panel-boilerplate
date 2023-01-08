import axios from "axios";
let token = sessionStorage.getItem("access_token");

const axiosInstance = axios.create({
  baseURL: "https://run.mocky.io/v3",
  headers: {
    Authorization: token,
  },
});

export default axiosInstance;
//delete link
//https://designer.mocky.io/manage/delete/5b208333-44f9-422c-999d-d5a72ba9c233/FSZ5mXJgOYeRP1u5tofcb3X4TGM9UED2hY6V