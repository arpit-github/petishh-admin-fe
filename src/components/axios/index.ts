import axios from "axios";
import { message } from "antd";

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
});

api.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  };
  config.url = process.env.API_COMMON_END_POINT + config.url;
  const token = localStorage.getItem("user-access-token");

  if (token) {
    config.headers["Authorization"] = token;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const token = localStorage.getItem("user-access-token");
    if (error.response?.status === 401 && token) {
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
