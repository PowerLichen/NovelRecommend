import { combineReducers } from 'redux';
import user from './user_reducer';
import menuReducers from "./menuReducers";
import authReducers from "./authReducers";

//import authReducers from "./user_reducer";

const rootReducer = combineReducers({
    user,
    menu: menuReducers,
    auth: authReducers,
    //auth: authReducers,
});

export default rootReducer;