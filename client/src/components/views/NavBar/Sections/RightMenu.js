/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState} from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {logoutUser} from '../../../../_actions/user_actions'

function RightMenu(props) {
  
  const user = useSelector(state => state.user)
  //const isLogin = props.isLogin
  const dispatch =useDispatch();
  const [formErrorMessage, setFormErrorMessage] = useState('')

  // const logoutHandler = () => {
  //   axios.get(`${USER_SERVER}/user/logout`).then(response => {
  //     if (response.status === 200) {
  //       props.history.push("/login");
  //     } else {
  //       alert('Log Out Failed')
  //     }
  //   });
  // };

  const logoutHandler= (event) =>{
    //event.preventDefault();
    
  
    dispatch(logoutUser())
      .then(response => {
        console.log(response.payload)
        if(user.userData===null){
          props.history.push('/login')
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
  };

  console.log(user.userData);
  //&& !user.userData.isLogin
  if ((!!user.userData)===true) {
    console.log('로그아웃');
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Sign in</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/join">Sign up</a>
        </Menu.Item>
      </Menu>
    );
  };
}

export default withRouter(RightMenu);

