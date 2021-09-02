//import Axios from 'axios'
import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_actions'

function RegisterPage() {
  const dispatch =useDispatch();

  const [Email,setEmail] = useState("")
  const [Password,setPassword] = useState("")
  const [ConfirmPassword,setConfirmPassword] = useState("")
  const [Name,setName] = useState("")
  const [Genre,setGenre] = useState("")
  
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
    setGenre(event.currentTarget.value)
  }
  const onSubmitHandler= (event) =>{
    event.preventDefault();

    if(Password !== ConfirmPassword){
      return alert('비밀번호와 비밀번호 확인이 다릅니다!')
    }
    
    let body = {
      email: Email,
      password: Password,
      name: Name,
      genre: Genre
    }
    dispatch(registerUser(body))

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
        <label>ConfirmPassword</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}></input>
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler}></input>
        <label>Genre</label>
        <input type="text" value={Genre} onChange={onGenreHandler}></input>

        <br/>
        <button type='submit'>
          회원 가입
        </button>
      </form>

    </div>
  )
}

export default RegisterPage

