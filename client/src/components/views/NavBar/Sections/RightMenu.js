/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState} from 'react';
import { Menu } from 'antd';
//import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {logoutUser} from '../../../../_actions/user_actions'


//formErrorMessage는 에러문구를 표시하는 것? 토스트메시지처럼 사용?
function RightMenu(props) {
  
  const user = useSelector(state => state.user)
  //const isLogin = props.isLogin
  const dispatch =useDispatch();
  const [formErrorMessage, setFormErrorMessage] = useState('');

  const logoutHandler = (event) => {
    dispatch(logoutUser()).then(() => {
      props.history.push('/login');
    })
      .catch(err => {
        console.log(err)
        setFormErrorMessage('서버 연결이 불안정합니다.')
        setTimeout(() => {
          setFormErrorMessage("")
        }, 3000);
      });
      
  };
  console.log(user.userData)

  if ((!!user.userData)===true) {
    return (
      <div>
      {user.userData &&(
      <Menu mode={props.mode}>
        <Menu.Item key="hello">
          <a href="/mypage">{`${user.userData.id} 님 반갑습니다.`}</a>
        </Menu.Item>
        <Menu.Item key="sada">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
        
      </Menu>
    )}
    </div>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="sada">
          <a href="/login">로그인</a>
        </Menu.Item>
        <Menu.Item key="join">
          <a href="/join">회원가입</a>
        </Menu.Item>
      </Menu>
    );
  };
}

export default withRouter(RightMenu);

