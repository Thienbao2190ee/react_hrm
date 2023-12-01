import axios from "axios";
import { getCookie } from "../until/getCookie";

const urlApi = 'http://localhost:8000/api';

const axiosClient = axios.create({
    baseURL: `${urlApi}`
});

axiosClient.interceptors.request.use(async (config) => {
    const access_token = getCookie("access_token")
    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
});

export { axiosClient };