import axios from "axios";

import { LOCAL_KEYS } from "constants/values";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const baseAxios = () => {
  httpClient.interceptors.request.use(function (config) {
    const token = JSON.parse(localStorage.getItem(LOCAL_KEYS.token));

    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return {
    get: (url, options = {}) => httpClient.get(url, { ...options }),
    post: (url, data, options = {}) =>
      httpClient.post(url, data, { ...options }),
    put: (url, data, options = {}) => httpClient.put(url, data, { ...options }),
    delete: (url, options = {}) => httpClient.delete(url, { ...options }),
  };
};

const HTTPMethod = baseAxios();

export default HTTPMethod;
