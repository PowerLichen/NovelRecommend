import ActionButton from 'antd/lib/modal/ActionButton';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    AUTH_FETCH_USER,
} from '../_actions/types';
 

export default function saga(state={},action){
    //console.log('로그아웃 유저')
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload.loginSuccess, userData: action.payload.user }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            console.log('로그아웃 유저')
            return {...state, userData: null }
        case AUTH_FETCH_USER:
            return {...state, user: action.payload,};
        default:
            return state;
    }
}