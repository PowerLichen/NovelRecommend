import {
    AUTH_CHECKID,
    AUTH_CLEAR_ERRORS,
    AUTH_LOGOUT,
    AUTH_ERRORS,
    AUTH_AUTHENTICATED,
    AUTH_FETCH_USER,
} from "./types";

const INITIAL_STATE = {
    isAuthenticated: false,
    isCheckId: false,
    user: {},
    errors: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true,
            };

        case AUTH_CHECKID:
            return {
                ...state,
                isCheckId: action.payload,
            };

        case AUTH_LOGOUT:
            return {
                ...state,
                user: {},
                errors: {},
            };

        case AUTH_ERRORS:
            return {
                ...state,
                user: {},
                errors: action.payload,
            };
        case AUTH_CLEAR_ERRORS:
            return {
                ...state,
                errors: {},
            };

        case AUTH_FETCH_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};
