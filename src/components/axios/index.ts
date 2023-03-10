import axios from "axios";
import { message } from "antd";

const api = axios.create();

api.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  };

  config.url = process.env.API_COMMON_END_POINT + config.url;

  const userDetails = localStorage.getItem("user-details");
  if (userDetails && JSON.parse(userDetails)?.accessToken?.access_token) {
    config.headers["Authorization"] =
      JSON.parse(userDetails).accessToken.access_token;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const userDetails = localStorage.getItem("user-details");
    if (error.response?.status === 401 && userDetails) {
      message.error({
        content: "User not unauthorized!",
        key: "unauthorized",
        duration: 4,
      });
      localStorage.clear();
      window.location.pathname = "/login";
    }
    throw error;
  }
);

export default api;
