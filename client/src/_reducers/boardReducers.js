import {
    BOARD_FETCH,
    BOARD_INSERT,
    BOARD_EDIT,
    BOARD_DELETE,
    BOARD_FETCH_DETAIL,
} from "../types";

const INITIAL_STATE = {
    boardItems: [],
    boardDetail: "",
    totalPage: 0,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BOARD_FETCH:
            return {
                ...state,
                boardItems: action.payload.data,
                totalPage: action.payload.totalPage,
            };
        case BOARD_FETCH_DETAIL:
            return {
                ...state,
                boardDetail: action.payload,
            };

        // item 추가
        case BOARD_INSERT:
            return {
                ...state,
                boardItems: [action.payload, ...state.boardItems],
            };

        // id 일치하는 item 업데이트
        case BOARD_EDIT:
            return {
                ...state,
                boardItems: state.boardItems.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                ),
            };

        // id 일치 하는 item 삭제
        case BOARD_DELETE:
            return {
                ...state,
                boardItems: state.boardItems.filter(
                    (item) => item._id !== action.payload._id
                ),
            };

        default:
            return state;
    }
};
