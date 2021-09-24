import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import { USER_SERVER } from '../../../components/Config.js';

import { Link } from 'react-router-dom'; 

//작품출력
function NovelPostPage(props) {
    
  const [posts, setPosts] = useState([]);
    
    useEffect(() => {
      axios
        .get(`${USER_SERVER}/novel/lists`)  //테스트용 주소,  
        //.then((data)=>{console.log(data);})
        .then(({ data }) => setPosts(data));
    },[]);
    
    return (
      <Container>
        <GlobalStyle />
        {posts.map((data, index) => (
          <Post key={index}>
            {/* 
            <Link to="/TestPage2">  
            <Body>{post.body}</Body>
            </Link> 
            */}
            <Body>
              <a href={`/novel/${data.id}`}>
                {/* 작품 표지 이미지 url */}
                <img src = {`${data.imgurl}`} width = '150' align = 'center'></img> 
              </a>
            </Body>
            {/* 작품 타이틀*/}
            <Title>{data.title}</Title>
          </Post>
          
        ))}
      </Container>
    );
}

//스타일 영역
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


export default NovelPostPage
