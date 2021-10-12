//import Axios from 'axios'
//import { response } from 'express';
import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_actions'
//import { USER_SERVER } from '../../../components/Config.js';

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

    // Axios.post('/api/users/login', body)
    //   .then(response => {})
  }
 

  return (
    <div style={{
      display:'flex', justifyContent:'center',alignContent:'center',
      width:'100%',height:'100vh'
    }}>
      <form style={{display:'flex', flexDirection: 'column'}}
      onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}></input>
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}></input>
        <br/>
        <button type='submit'>
          Login
        </button>
        {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}
      </form>

    </div>
  )
}

export default LoginPage

