import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    //AUTH_FETCH_USER,
} from './types';
import { USER_SERVER } from '../components/Config.js';
//import setAuthHeader from "../util/setAuthHeader";

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/user/join`,dataToSubmit)
        .then(response => response.data)
        //.then(setAuthHeader(response => response.dataToSubmit.token));
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/user/login`,dataToSubmit)
                .then(response => {localStorage.setItem('usertoken', response.data)
                return response.data})
                //.then(setAuthHeader(response => response.dataToSubmit.token));
    console.log(request);
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/user`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return {
        type: LOGOUT_USER,
        payload: request
    }
}

// export const authAction_fetchUserData = () => async (dispatch) => {
//     try {
//         const response = await axios.get(`${USER_SERVER}/user`);
//         dispatch({
//             type: AUTH_FETCH_USER,
//             payload: response.data.user,
//         });
//     } catch (err) {
//         console.error("authAction_fetchUserData error", err);
//     }
// };


// export const authAction_token = (token) => async (dispatch) => {
//     try {
//         const response = await axios.post(`${USER_SERVER}/user/token`, token);

//         const accessToken = "Bearer " + response.data.accessToken;
//         localStorage.setItem("accessToken", accessToken);

//         axios.defaults.headers.common["Authorization"] = accessToken;
//         dispatch(authAction_fetchUserData());
//     } catch (err) {
//         console.error("authAction_token error", err);
//     }
// };
