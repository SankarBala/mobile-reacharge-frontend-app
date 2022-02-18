import axios from 'axios';
import { host } from './config';
import * as Storage from "./controllers/Storage";

const api = async (): Promise<any> => {
    return Storage.getData("token").then(token => {
        axios.defaults.baseURL = `${host}/api`;
        axios.defaults.headers.common = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
        
        return axios;
    });
}

export default api;
