import axios from 'axios';
import jwt_decode from "jwt-decode";

import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    //AUTH_FETCH_USER,
} from './types';
import { USER_SERVER } from '../components/Config.js';
//import setAuthHeader from "../util/setAuthHeader";

export async function registerUser(dataToSubmit){
    const request = await axios.post(`${USER_SERVER}/user/join`,dataToSubmit)
        .then(response => response.data)
        //.then(setAuthHeader(response => response.dataToSubmit.token));
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export async function loginUser(dataToSubmit){
    const request = await axios.post(`${USER_SERVER}/user/login`,dataToSubmit, {withCredentials:true})
                .then(response => {localStorage.setItem('usertoken', response.data)
                return response.data})
                //.then(setAuthHeader(response => response.dataToSubmit.token));
    console.log(request);
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export async function auth(){
    const request = await axios.get(`${USER_SERVER}/user`,{withCredentials:true})
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export async function logoutUser(){
    console.log('로그아웃 action 시작')
    const request = await axios.get(`${USER_SERVER}/user/logout`,{withCredentials:true})
    .then(response => response.data);

    return {
        type: LOGOUT_USER
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
