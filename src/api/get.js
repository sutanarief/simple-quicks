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

export const getUser = () => {
  return axios
    .get(`${baseUrl}/user`)
    .then((response) => response.data)
    .catch((err) => console.log(err))
}

export const getPosts = () => {
  return axios
    .get(`${baseUrl}/post`)
    .then((response) => response.data)
    .catch((err) => console.log(err))
}

export const getDetailPost = (id) => {
  return axios
    .get(`${baseUrl}/post/${id}`)
    .then((response) => response.data)
    .catch((err) => console.log(err))
}

export const getPostComment = (id) => {
  return axios
    .get(`${baseUrl}/post/${id}/comment`)
    .then((response) => response.data)
    .catch((err) => console.log(err))
}