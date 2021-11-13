import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import StarRatingComponent from 'react-star-rating-component';
import axios from "axios";
import { USER_SERVER } from '../../../components/Config.js';
import styled from 'styled-components';
import { Descriptions } from 'antd';

 
function RatingPage(props) {
  
    //별점 점수 
    const [Score, setScore] = useState([5]);
    //평점 체크
    const [Check, setCheck] = useState([]);

    //유저 정보
    const user = useSelector(state => state.user)
    const RecHandler = (event) => {
      if ((!!user.userData) === true) {
        return
      }
      else{
        return setCheck(true);
      }
    }

    useEffect(() => {
      //유저 점수 체크(이미 했으면 버튼 비활성화 기능)
      if (user.userData === undefined) {
        return
      }
      //유저 데이터가 없으면 비활성화
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
          <span>
            <RedButton onClick={submitScore} disabled="disabled" >평가불가</RedButton>
          </span>
        )
      }
      else {
        return(
          <span>
            <BlueButton onClick={submitScore}> 
              평가하기
            </BlueButton>
          </span>
        )
      }
    }

    return (         
      <span style={{ float: 'right', margin:'0% 0 0 0'}} >
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={Score}
          onStarClick={onStarClick}
        />  
        <span style={{ color: '#f4ac19',fontSize: '20px', margin: '0 20px 0 10px'}}>
          {Score}
        </span>  
        {
          checkScore()
        }
      </span>
    );
  
}

const BlueButton = styled.button`
  padding: 6px 12px;
  color: white;
  border: none;
  border-radius: 4px;
  background-color: #74b9ff;
  :hover {
    background-color: #99c6f5;
  }
`;

const RedButton = styled(BlueButton)`
  background-color: #f53e3e;
  :hover {
    background-color: #f53e3e;
  }
`;
export default RatingPage;