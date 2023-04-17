import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL

axios.interceptors.request.use(
  async (config) => {
    config.headers["app-id"] = import.meta.env.VITE_APP_ID;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const createComment = (data) => {
  return axios
    .post(`${baseUrl}/comment/create`, data)
    .then((response) => response.data)
    .catch((err) => console.log(err))
}