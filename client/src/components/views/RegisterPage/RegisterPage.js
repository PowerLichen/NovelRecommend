//import Axios from 'axios'
import React,{useState,  useEffect} from 'react'
import { useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_actions'
import { Formik } from 'formik';
import {Form, Checkbox, Radio, Input, Button,Typography } from "antd";
const { Title } = Typography;
function RegisterPage(props) {
  const dispatch =useDispatch();

  const [Email,setEmail] = useState("")
  const [Password,setPassword] = useState("")
  const [ConfirmPassword,setConfirmPassword] = useState("")
  const [Name,setName] = useState("")
  const [Genre,setGenre] = useState("")
  //const { errors } = useSelector((state) => state.user);
  const [inputs, setInputs] = useState({
    genre:"mystery",
    checkbox: {},
    content: "",
    errors: {},
});
  
  const onEmailHandler=(event)=>{
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler=(event)=>{
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler=(event)=>{
    setConfirmPassword(event.currentTarget.value)
  }
  const onNameHandler=(event)=>{
    setName(event.currentTarget.value)
  }
  const onGenreHandler=(event)=>{
    setGenre(event.currentTarget.checked)
  }

  useEffect(() => {
    setInputs((state) => ({
        ...state,
    }));
}, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
        setInputs((state) => ({
            ...state,
            checkbox: {
                ...state.checkbox,
                [name]: checked,
            },
        }));
    } else {
        setInputs((state) => ({
            ...state,
            [name]: value,
        }));
    }
};
  const onSubmitHandler= (event) =>{
    event.preventDefault();

    if(Password !== ConfirmPassword){
      return alert('비밀번호와 비밀번호 확인이 다릅니다!')
    }
    
    let userData = {
      email: Email,
      password: Password,
      name: Name,
      genre: inputs.genre,
    }
    dispatch(registerUser(userData))
      .then(response => {
        if (response.payload.success) {
          props.history.push('/login')
        } else {
          alert("회원가입에 실패하였습니다.")
        }
      })
    // Axios.post('/api/users/login', body)
    //   .then(response => {})
  }
 

  return (
    <div style={{
      display:'flex', justifyContent:'center',alignContent:'center',
      width:'100%',height:'100vh', margin:'150px auto'
    }}>
      <form style={{display:'flex', flexDirection: 'column'}}
      onSubmit={onSubmitHandler}>
        <Title level={2} classname='join' style={{ width: '100%', height: '1vh', margin: '0 0 70px 70px', alignContent: 'center' }}>
            회원가입</Title>
        {/* <label>Email</label> */}
        <Form.Item required label="이메일">
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="email"
                  value={Email}
                  onChange={onEmailHandler}
                  //onBlur={handleBlur}
                  // className={
                  //   errors.email && touched.email ? 'text-input error' : 'text-input'
                  // }
                />
                {/* {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )} */}
              </Form.Item>
        {/* <Form.Control.Feedback type="invalid">
            {errors.Email}
        </Form.Control.Feedback> */}
        <Form.Item required label="비밀번호">
          <Input
            id="password"
            placeholder="Enter Password"
            type="password"
            value={Password}
            onChange={onPasswordHandler} />
        </Form.Item>
        <Form.Item required label="비번확인">
          <Input
            id="password-confirm"
            placeholder="Password-confirm"
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler} />
        </Form.Item>
        <Form.Item required label="이름"
        style={{margin: '0 0 30px'}}>
          <Input
            id="name"
            placeholder="Enter your name"
            type="text"
            value={Name}
            onChange={onNameHandler} />
        </Form.Item>
       <Form.Item>
       <Title level={4} classname='join' style={{ width: '100%', height: '1vh', margin: '0 0 30px 90px', alignContent: 'center' }}>
            최애장르</Title>
          <div key="custom-inline-checkbox" className="mb-3">
            <Checkbox
              custom
              inline
              //label="미스터리"
              name="genre"
              type="radio"
              checked={inputs.genre === "mystery"}
              id="custom-inline-checkbox-1"
              value="mystery"
              onChange={handleChange}>
                미스터리
            </Checkbox>
            <Checkbox
              custom
              inline
              name="genre"
              //label="BL"
              type="radio"
              id="custom-inline-checkbox-2"
              checked={inputs.genre === "BL"}
              value="BL"
              onChange={handleChange}>
                BL
            </Checkbox>
            </div>
            <div key="custom-inline-checkbox" className="mb-3">
            <Checkbox
              custom
              inline
              name="genre"
              //label="LN"
              type="radio"
              id="custom-inline-checkbox-3"
              checked={inputs.genre === "LN"}
              value="LN"
              onChange={handleChange}>
                라이트노벨
              </Checkbox>
              <Checkbox
              custom
              inline
              name="genre"
              //label="LN"
              type="radio"
              id="custom-inline-checkbox-4"
              checked={inputs.genre === "hero"}
              value="hero"
              onChange={handleChange}>
                무협
              </Checkbox>
          </div>
          <div key="custom-inline-checkbox" className="mb-3">
            <Checkbox
              custom
              inline
              name="genre"
              //label="LN"
              type="radio"
              id="custom-inline-checkbox-5"
              checked={inputs.genre === "MF"}
              value="MF"
              onChange={handleChange}>
                현대판타지
              </Checkbox>
              <Checkbox
              custom
              inline
              name="genre"
              //label="LN"
              type="radio"
              id="custom-inline-checkbox-6"
              checked={inputs.genre === "RF"}
              value="RF"
              onChange={handleChange}>
                로맨스판타지
              </Checkbox>
          </div>
          <div key="custom-inline-checkbox" className="mb-3">
            <Checkbox
              custom
              inline
              name="genre"
              //label="LN"
              type="radio"
              id="custom-inline-checkbox-7"
              checked={inputs.genre === "fantasy"}
              value="fantasy"
              onChange={handleChange}>
                판타지
              </Checkbox>
              <Checkbox
              custom
              inline
              name="genre"
              //label="LN"
              type="radio"
              id="custom-inline-checkbox-8"
              checked={inputs.genre === "romance"}
              value="romance"
              onChange={handleChange}>
                로맨스
              </Checkbox>
          </div>
          <div key="custom-inline-checkbox" className="mb-3">
            <Checkbox
              custom
              inline
              name="genre"
              //label="LN"
              type="radio"
              id="custom-inline-checkbox-9"
              checked={inputs.genre === "fusion"}
              value="fusion"
              onChange={handleChange}>
                퓨전
              </Checkbox>
              <Checkbox
              custom
              inline
              name="genre"
              //label="LN"
              type="radio"
              id="custom-inline-checkbox-10"
              checked={inputs.genre === "game"}
              value="game"
              onChange={handleChange}>
                게임
              </Checkbox>
              <Checkbox
              custom
              inline
              name="genre"
              //label="LN"
              type="radio"
              id="custom-inline-checkbox-11"
              checked={inputs.genre === "novel"}
              value="novel"
              onChange={handleChange}>
                소설
              </Checkbox>
          </div>
          <div key="custom-inline-checkbox" className="mb-3">
            
              <Checkbox
              custom
              inline
              name="genre"
              //label="LN"
              type="radio"
              id="custom-inline-checkbox-12"
              checked={inputs.genre === "history"}
              value="history"
              onChange={handleChange}>
                역사
              </Checkbox>
              <Checkbox
              custom
              inline
              name="genre"
              //label="LN"
              type="radio"
              id="custom-inline-checkbox-13"
              checked={inputs.genre === "sports"}
              value="sports"
              onChange={handleChange}>
                스포츠
              </Checkbox>
              <Checkbox
              custom
              inline
              name="genre"
              //label="LN"
              type="radio"
              id="custom-inline-checkbox-14"
              checked={inputs.genre === "horror"}
              value="horror"
              onChange={handleChange}>
                공포
              </Checkbox>
          </div>
          <div key="custom-inline-checkbox" className="mb-3">
            <Checkbox
              custom
              inline
              name="genre"
              //label="LN"
              type="radio"
              id="custom-inline-checkbox-15"
              checked={inputs.genre === "policier"}
              value="policier"
              onChange={handleChange}>
                추리
              </Checkbox>
              <Checkbox
              custom
              inline
              name="genre"
              //label="LN"
              type="radio"
              id="custom-inline-checkbox-16"
              checked={inputs.genre === "SF"}
              value="SF"
              onChange={handleChange}>
                SF
              </Checkbox>
              <Checkbox
              custom
              inline
              name="genre"
              //label="LN"
              type="radio"
              id="custom-inline-checkbox-17"
              checked={inputs.genre === "military"}
              value="military"
              onChange={handleChange}>
                밀리터리
              </Checkbox>
          </div>
        </Form.Item>
        <br/>
        <Form.Item>
            <div>
              <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%', margin: '0 0 20px 0' }} onSubmit={onSubmitHandler}>
              회원 가입
              </Button>
            </div>
          </Form.Item>
        {/* <button type='submit'>
          회원 가입
        </button> */}
      </form>

    </div>
  )
}

export default RegisterPage

