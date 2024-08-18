"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const axiosInstance = axios_1.default.create({
    baseURL: config_1.BACKEND_URL,
});
axiosInstance.interceptors.request.use(async (config) => {
    const cnf = await new Promise((resolve) => {
        chrome.cookies.get({ url: config_1.FE_ORIGIN, name: 'token' }, cookie => {
            if (!cookie) {
                resolve(config);
            }
            else {
                config.headers['Authorization'] = `Bearer ${cookie.value}`;
                resolve(config);
            }
        });
    });
    return cnf;
});
axios_1.default.interceptors.response.use(response => {
    return response;
}, async (error) => {
    if (error.response.status === 401) {
        await chrome.runtime.sendMessage({ type: 'applicaid_logout' });
    }
    return false;
});
const getProfile = async () => {
    const response = await axios_1.default.get(config_1.BACKEND_URL + '/users/profile');
    console.log(response.data);
    return response.data;
};
exports.getProfile = getProfile;
