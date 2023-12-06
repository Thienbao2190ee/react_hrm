import axios from "axios";
import { getCookie } from "../until/getCookie";

const urlApi = 'http://localhost:8000/api';

const axiosClient = axios.create({
    baseURL: `${urlApi}`
});

// axiosClient.interceptors.request.use(async (config) => {
//     const access_token = getCookie("userInfo")
//     console.log('userInfo',access_token);
//     config.headers.Authorization = `Bearer ${access_token}`;
//     return config;
// });

axiosClient.interceptors.request.use(async (config) => {
    const access_token = getCookie("userInfo");
    console.log('userInfo', access_token);
    config.headers.Authorization = `Bearer ${access_token}`;
  
    // Check if the request is a file upload (multipart/form-data)
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
  
    return config;
  });

export { axiosClient };