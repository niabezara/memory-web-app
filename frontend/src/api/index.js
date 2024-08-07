import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
// const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SERVER = `http://localhost:3000`;

export const API = axios.create({
  baseURL: SERVER || BASE_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
