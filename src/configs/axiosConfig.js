import axios from "axios";

axios.interceptors.response.use(
 function (response) {
  return response;
 },
 function (error) {
  if (error.response && error.response.status === 403) {
   localStorage.removeItem("userData");

    window.location.href = "/login";
  }

  return Promise.reject(error);
 }
);
