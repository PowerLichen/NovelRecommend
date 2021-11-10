import {
    MENU_FETCH,
    MENU_UPDATE_SECOND,
    MENU_UPDATE_THIRD,
    MENU_ERRORS,
} from "../_reducers/types";
import axios from "axios";
import { validateInsertMenu } from "../components/Header/validate";


const apiUrl = "http://localhost:3000/json/RecommendMenuItems.json";
// 모든 메뉴 데이터 Fetch
export const menuAction_fetch2 = () => async (dispatch) => {
    console.log(apiUrl);

    try {
        const response = await axios.get(apiUrl);
        const data = response.data.data;
        console.log(response);

        dispatch({
            type: MENU_FETCH,
            payload: data,
        });
    } catch (err) {
        console.error(err);
    }
};

export const menuAction_updateSecond2 = (newPath, newItem) => {
    return {
        type: MENU_UPDATE_SECOND,
        payload: { newPath, newItem },
    };
};

export const menuAction_updateThird2 = (newPath, newItem) => {
    return {
        type: MENU_UPDATE_THIRD,
        payload: { newPath, newItem },
    };
};

export const menuAction_validateInput2 = (inputs) => (dispatch) => {
    const { valid, errors } = validateInsertMenu(inputs);
    if (!valid) {
        dispatch({
            type: MENU_ERRORS,
            payload: errors,
        });
    }
};
