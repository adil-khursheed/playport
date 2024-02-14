import axios from "axios";
import conf from "../conf/conf";

export default axios.create({
  baseURL: `${conf.baseUrl}`,
});

export const axiosPrivate = axios.create({
  baseURL: `${conf.baseUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
