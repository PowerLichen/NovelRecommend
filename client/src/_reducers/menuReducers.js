import {
    MENU_UPDATE_THIRD,
    MENU_UPDATE_SECOND,
    MENU_ERRORS,
    MENU_FETCH,
} from "./types";

const INITIAL_STATE = {
    menuItems: [],
    errors: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // 전체 메뉴 패치
        case MENU_FETCH:
            return {
                ...state,
                menuItems: action.payload,
            };

        // 2차 메뉴 아이템 추가
        case MENU_UPDATE_SECOND:
            return {
                ...state,
                menuItems: state.menuItems.map((first) => {
                    if (
                        // 기존 Path + 추가 Path = newItem Path
                        first.path + action.payload.newPath ===
                        action.payload.newItem.path
                    ) {
                        return {
                            ...first,
                            children: [
                                ...first.children,
                                action.payload.newItem,
                            ],
                        };
                    } else {
                        return first;
                    }
                }),
            };

        // 3차 메뉴 아이템 추가
        case MENU_UPDATE_THIRD:
            return {
                ...state,
                menuItems: state.menuItems.map((first) => {
                    if (
                        action.payload.newItem.path.indexOf(first.path) !== -1
                    ) {
                        return {
                            ...first,
                            children: first.children.map((second) => {
                                if (
                                    // 기존 Path + 추가 Path = newItem Path
                                    second.path + action.payload.newPath ===
                                    action.payload.newItem.path
                                ) {
                                    return {
                                        ...second,
                                        children: [
                                            ...second.children,
                                            action.payload.newItem,
                                        ],
                                    };
                                } else {
                                    return second;
                                }
                            }),
                        };
                    } else {
                        return first;
                    }
                }),
            };

        case MENU_ERRORS:
            return {
                ...state,
                errors: action.payload,
            };
        default:
            return state;
    }
};
