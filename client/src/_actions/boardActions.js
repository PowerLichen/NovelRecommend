import {
    BOARD_FETCH,
    BOARD_INSERT,
    BOARD_EDIT,
    BOARD_DELETE,
    BOARD_FETCH_DETAIL,
} from "../_reducers/types";
import axios from "axios";

// Fetch data
export const boardAction_fetch = ({ currentPage, find }) => async (
    dispatch
) => {
    const response = await axios.post("/apis/board", {
        currentPage: currentPage || 1,
        find: find || "",
    });
    const data = response.data;

    // API data fetch
    dispatch({
        type: BOARD_FETCH,
        payload: data,
    });
};

export const boardAction_fetch_detail = (id) => async (dispatch) => {
    const response = await axios.get("/apis/board/" + id);
    const data = response.data.data;

    dispatch({
        type: BOARD_FETCH_DETAIL,
        payload: data,
    });
};

// Insert or Edit data
export const boardAction_update = (item) => async (dispatch) => {
    // Insert New data
    // 아이디 없는 경우 신규 추가, 있으면 기존 데이터 수정
    if (!item.id) {
        try {
            const response = await axios.post("/apis/board/insert", item);
            dispatch({
                type: BOARD_INSERT,
                payload: response.data.data,
            });
        } catch (err) {
            console.error("boardAction_update(insert) Error:", err);
        }
    }
    // Edit data
    else {
        try {
            const response = await axios.post("/apis/board/update", item);
            dispatch({
                type: BOARD_EDIT,
                payload: response.data.data,
            });
        } catch (err) {
            console.error("boardAction_update(edit) Error:", err);
        }
    }
};

// Delete data
export const boardAction_delete = (item) => async (dispatch) => {
    try {
        axios.post("/apis/board/delete", item);
        dispatch({
            type: BOARD_DELETE,
            payload: item,
        });
    } catch (err) {
        console.error("boardAction_delete Error:", err);
    }
};
