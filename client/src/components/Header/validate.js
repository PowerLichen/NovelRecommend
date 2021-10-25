// 아이디 => 10자 이상, 숫자/영어/특수문자를 모두 포함
export const checkRegId = (id) => {
    var reg = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/;

    if (!reg.test(id)) {
        return false;
    } else {
        return true;
    }
};

export const validateInsertMenu = (inputs) => {
    const { path, name } = inputs;
    const errors = {};

    if (isEmpty(path)) {
        errors.path = "path를 입력해주세요.";
    }

    if (isEmpty(name)) {
        errors.name = "메뉴에 표시될 이름을 입력해주세요";
    }

    if (path.indexOf("/") === -1) {
        errors.path = "경로는 '/path' 형태로 입력해주세요.";
    }

    if (path.indexOf("/") !== -1 && path.split("/") > 2) {
        errors.path = "/는 한번만 작성 가능합니다.";
    }

    // 에러가 있으면 false 에러 없으면 true
    if (Object.keys(errors).length > 0) return { valid: false, errors };
    else return { valid: true, errors };
};

export const isEmpty = (string) => {
    if (string.trim() === "") return true;
    else return false;
};
