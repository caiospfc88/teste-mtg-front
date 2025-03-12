import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: base_url,
  timeout: 60000,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      if (config.headers) config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
