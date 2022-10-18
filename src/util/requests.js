import axios from "axios";

export const BASE_URL = 'http://localhost:8080';

export function register(registerRequest) {
    return axios({
        method: 'post',
        url: 'signup',
        baseUrl: BASE_URL,
        body: registerRequest,
    })
}