import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import StarRatingComponent from 'react-star-rating-component';
import axios from "axios";
import { USER_SERVER } from '../../../components/Config.js';
import { Descriptions } from 'antd';

 
function RatingPage(props) {
  
    //별점 점수
    const [Score, setScore] = useState([4]);

    const [Check, setCheck] = useState([]);

    //유저 정보
    const user = useSelector(state => state.user)
    const RecHandler = (event) => {
      if ((!!user.userData)===true) {
    
      }
      else{
        alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.')
        window.location.href = "/login"
        //props.history.push('/login');
      }
    }

    useEffect(() => {
      //유저 점수 체크(이미 했으면 버튼 비활성화 기능)
      if (user.userData === undefined) {
        return
      }
      if (user.userData === null) {
        return RecHandler();
      }
      axios
        .get(`${USER_SERVER}/rating/check_db/${user.userData.idx}/${props.nid}`)
        .then(({ data }) => { setCheck(data.check); console.log(data.check);})
    }, [user])
    
    //별점 클릭
    const onStarClick = (nextValue) => {
      setScore(nextValue);
    }

    //점수 제출
    const submitScore = () => {
      axios
        .get(`${USER_SERVER}/rating/addscore/${user.userData.idx}/${props.nid}/${Score}`) 
        .then((data)=>{console.log(data);})
  
      setCheck(true);
    }

    //유저 점수 체크 기능
    function checkScore() {
      const c = Check
      if(c === true) {
        return (
          <div style={{ display: 'flex' }}>
            <button onClick={submitScore} disabled="disabled" >제출불가</button>
          </div>
        )
      }
      else {
        return(
          <div style={{ display: 'flex' }}>
            <button onClick={submitScore} >제출</button>
          </div>
        )
      }
    }

    return (         
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        
        {user.userData &&(
          <Descriptions.Item label="My ID">
              {user.userData.idx}
              
          </Descriptions.Item>
        )}
        <br></br>
        {props.id}      
        <h2>평점 선택 : {Score}</h2>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={Score}
          onStarClick={onStarClick}
        />
        <br></br>
        {/* <div style={{ display: 'flex' }}>
          <button onClick={submitScore}>제출</button>
        </div> */}
        
        {
          checkScore()
        }
        
      </div>
        
      
    );
  
}

export default RatingPage;