import React, { useState } from "react";
import history from "../../history";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
    menuAction_validateInput,
    menuAction_updateSecond,
    menuAction_updateThird,
} from "../../redux/actions";

// BS
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PageTemplate from "../common/PageTemplate";

function HeaderModal() {
    const dispatch = useDispatch();
    const { errors } = useSelector((state) => state.menu);
    const [inputs, setInputs] = useState({ path: "", name: "" });

    const query = new URLSearchParams(history.location.search);
    const depth1 = query.get("depth1");
    const depth2 = query.get("depth2");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((state) => ({
            ...state,
            [name]: value,
        }));
    };

    const onSubmit = () => {
        dispatch(menuAction_validateInput(inputs));
        if (Object.keys(errors).length === 0) {
            // Insert 2th depth Menu Item
            if (!depth2) {
                dispatch(
                    menuAction_updateSecond(inputs.path, {
                        ...inputs,
                        path: depth1 + inputs.path, // path => /page3/newpath
                        children: [],
                    })
                );
            }
            // Insert 3th depth Menu Item
            else {
                dispatch(
                    menuAction_updateThird(inputs.path, {
                        ...inputs,
                        path: depth2 + inputs.path, // path => /page3/product3/newpath
                        children: [],
                    })
                );
            }
        }
        setInputs({ path: "", name: "" });
        history.goBack();
    };

    const handleClose = () => {
        history.goBack();
    };

    return (
        <PageTemplate>
            <Modal
                show={true}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        추가하기
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Path</Form.Label>
                            <Form.Control
                                type="input"
                                name="path"
                                value={inputs.path}
                                placeholder="/new"
                                onChange={handleChange}
                                isInvalid={errors.path ? true : false}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.path}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="input"
                                name="name"
                                value={inputs.name}
                                placeholder="메뉴에 표시될 이름을 적어주세요."
                                onChange={handleChange}
                                isInvalid={errors.name ? true : false}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button onClick={onSubmit}>저장하기</Button>
                </Modal.Footer>
            </Modal>
        </PageTemplate>
    );
}

export default React.memo(HeaderModal);
