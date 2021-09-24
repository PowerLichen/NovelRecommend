import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRatingComponent from 'react-star-rating-component';
import { USER_SERVER } from '../../../../components/Config.js';
import styled, { createGlobalStyle } from "styled-components";

//작품 페이지 출력
function NovelInfo(props) {

    const [rating, setRating] = useState([4]);
    const [novels, setNovels] = useState([]);

    

    useEffect(() => {
        axios
            .get(`${USER_SERVER}/novel/noveldata/${props.id}`)
            //.then((data)=>{console.log(data);})
            .then(({ data }) => setNovels(data));
      }, [])

    return (
        
    // <Container>
    //     <GlobalStyle />
    //     {novels.map((data, index) => (
    //       <Post>
    //         <Body>
    //             {/* 작품 표지 이미지 url */}
    //             <img src = {`${data.imgurl}`} width = '150' align = 'center'></img>
    //         </Body>
    //         {/* 작품 타이틀*/}
    //         <Title>{data.title}</Title>
            
    //       </Post>
          
    //     ))}
    // </Container>
      
        <div>
            
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/* 작품 이미지 */}
            <img src = {`${novels.imgurl}`} width = '300' align = 'left'></img> {/*임시 이미지*/}
            
            
            {/*타이틀*/}
            <h1>{novels.title}</h1>
             {/*평점*/}
            <div align="left"  >
                <StarRatingComponent 
                        name="rate2" 
                        editing={false}
                        starCount={5}
                        value={rating}
                    />
                <h3> 평점                {rating} </h3> 
            </div>
            <h2> 장르  :  {novels.genre}</h2>
            <h2> 링크  :  {novels.url}</h2>
            <h2> 줄거리   </h2>
            <p>{novels.description}</p>
            {novels.id}
ty
        </div>
        
    );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  padding: 150px 0;
  display: grid;
  grid-template-columns: repeat(5, 300px);
  grid-template-rows: repeat(auto-fit, 300px);
  grid-auto-rows: 300px;
  grid-gap: 30px 20px;
  justify-content: center;
  box-sizing: border-box;
`;

const Post = styled.div`
  border: 1px solid black;
  background: white;
  
`;

const Title = styled.div`
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px black;
`;

const Body = styled.div`
  height: 80%;
  padding: 11px;
  border-radius: 20px;
  
`;

export default NovelInfo
