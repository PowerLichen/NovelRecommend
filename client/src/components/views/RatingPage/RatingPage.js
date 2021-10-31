import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import axios from "axios";
import { USER_SERVER } from '../../../components/Config.js';

import { Descriptions } from 'antd';

 
function RatingPage(props) {
  
    //별점 점수
    const [Score, setScore] = useState([4]);
    //회원 idx
    const [Idx, setIdx] = useState([0]);

    //유저 정보
    const user = useSelector(state => state.user)
    console.log(user.userData)
    
    //별점 클릭
    const onStarClick = (nextValue) => {
      setScore(nextValue);
    }

    useEffect(() => {
      //setIdx(user.userData.idx);
    }, [])


    //점수 제출
    const submitScore = () => {
      axios
        .get(`${USER_SERVER}/rating/addscore/${user.userData.idx}/${props.id}/${Score}`) 
        .then((data)=>{console.log(data);})
        //.then(({ data }) => {setPosts(data)});

      // fetch(`${USER_SERVER}/rating/addscore/20/83222/5`) //`${USER_SERVER}/rating/addscore/${user.userData.idx}/${props.id}/${Score}`
      // .then(response => response.json())
      //       .then(response => {
      //           console.log(response)
      //           //setScore([...Score, ...response])
      //         })
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
        <div style={{ display: 'flex' }}>
          <button onClick={submitScore}>제출</button>
        </div>
        
      </div>
        
      
    );
  
}

export default RatingPage;