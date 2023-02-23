import axios from "axios";


export const apiInstance = axios.create({
    baseURL: process.env.OPEN_WHEATHER_MAP_API_URL ,
});
