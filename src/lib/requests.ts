import axios, { InternalAxiosRequestConfig } from "axios";
import { BACKEND_URL, FE_ORIGIN } from "../config";


const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
});
axiosInstance.interceptors.request.use(
    async config => {
        // Get the token from the cookie
        const cnf: InternalAxiosRequestConfig<any> = await new Promise((resolve) => {
            chrome.cookies.get({ url: FE_ORIGIN, name: 'token' },
                cookie => {
                    if (!cookie) {
                        resolve(config);
                    } else {
                        config.headers['Authorization'] = `Bearer ${cookie.value}`;
                        resolve(config);
                    }
                }
            );
        });
        return cnf
    }
);
axios.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        if (error.response.status === 401) {
            await chrome.runtime.sendMessage({ type: 'applicaid_logout' });
        }
        return false
    }
);

export const getProfile = async () => {
    const response = await axios.get(BACKEND_URL + '/users/profile')
    console.log(response.data)
    return response.data
}