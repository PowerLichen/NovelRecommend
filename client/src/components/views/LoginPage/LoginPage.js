import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_actions'
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import {FaUserAlt} from "react-icons/fa";
import {FaLockOpen} from "react-icons/fa";

const { Title } = Typography;


function LoginPage(props) {
  const dispatch =useDispatch();

  const [Email,setEmail] = useState("")
  const [Password,setPassword] = useState("")
  const [formErrorMessage, setFormErrorMessage] = useState('')

  const onEmailHandler=(event)=>{
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler=(event)=>{
    setPassword(event.currentTarget.value)
  }
  
  const onSubmitHandler= (event) =>{
    event.preventDefault();
    
    let body = {
      email: Email,
      password: Password
    }
    dispatch(loginUser(body))
      .then(response => {
        console.log(response.payload)
        if(response.payload.loginSuccess){
          props.history.push('/')
        }else{
         setFormErrorMessage(response.payload.reason)
              }
            })
            .catch(err => {
              console.log(err)
              setFormErrorMessage('서버 연결이 불안정합니다.')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
  }
 

  return (


    <div style={{ display: 'flex', justifyContent: 'center', 
    alignContent: 'center', width: '20%', margin: '150px auto', height: '45vh', 
    backgroundColor: '#FAE3BF', borderRadius: '8px',boxShadow:'4px 4px 4px' }}>

      <div style={{
        display: 'flex', justifyContent: 'center', alignContent: 'center',
        width: '100%', height: '10vh', margin: '60px 0',
      }}>

        <form style={{ display: 'flex', flexDirection: 'column', margin: '10px ' }}
          onSubmit={onSubmitHandler}>
          <Title level={2} classname='login' style={{ width: '100%', height: '1vh', margin: '0 30% 40% 30%', alignContent: 'center' }}>
            로그인</Title>
          <label>Email</label>
          {/* <input type="email" value={Email} onChange={onEmailHandler}></input> */}
          <Form.Item required>
            <Input
              id="email"
              prefix={<FaUserAlt />}
              placeholder="Enter your email"
              type="email"
              value={Email}
              onChange={onEmailHandler}

            />

          </Form.Item>
          <label>Password</label>
          {/* <input type="password" value={Password} onChange={onPasswordHandler}></input> */}
          <Form.Item required>
            <Input
              id="password"
              prefix={<FaLockOpen/>}
              placeholder="Enter your password"
              type="password"
              value={Password}
              onChange={onPasswordHandler}

            />

          </Form.Item>
          <br />

          {formErrorMessage && (
            <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
          )}
          <Form.Item>
            <a className="login-form-forgot" href="/reset_user" style={{ float: 'right', margin: '0 0 10px 0' }}>
              forgot password
            </a>
            <div>
              <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%', margin: '0 0 20px 0' }} onSubmit={onSubmitHandler}>
                Log in
              </Button>
            </div>
            <div>계정이 없으신가요?</div> 
            <a href="/join" style={{ float: 'right'}}>회원가입</a>
          </Form.Item>
        </form>

      </div>
    </div>
  )
}

export default LoginPage

