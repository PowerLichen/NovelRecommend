import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import { USER_SERVER } from '../../Config.js';
import { useSelector } from "react-redux";
import RecommendTab from "./RecommendTab.js";


//평점 준 작가 기반 소설 리스트 출력
function RatingAuthorPage(props) {
    
  const [Posts, setPosts] = useState([]);
  const [Pages, setPages] = useState([1]);

  //유저 정보
  const user = useSelector(state => state.user)
  console.log(user.userData)

  useEffect(() => {
    if (user.userData === undefined) {
      return
    }
    
    axios
      .get(`${USER_SERVER}/novel/relatedbook/${user.userData.idx}/0`)
      .then(({ data }) => { setPosts(data); console.log(data);});
  }, [user])

  //소설 포스트 페이지 갱신
  const fetchNovel = () => {
      
    setPages(Number(Pages)+1);

    fetch(`${USER_SERVER}/novel/relatedbook/${user.userData.idx}/${Pages}`)
          .then(response => response.json())
          .then(response => {
              console.log(response)
              setPosts([...Posts, ...response])     
              //setCurrentPage(response.page)
    })
  }

  return (
    <div>
      <RecommendTab/>
      <Container>
        <GlobalStyle />
        {Posts.map((data, index) => (
          <Post key={index}>
            <a href={`/novel/${data.id}`}>
            <Body>
              {/* 작품 표지 이미지 url */}
              <Img>
                <img src = {`${data.imgurl}`} width = '200' height = '280' align = 'center' ></img> 
              </Img>
              <Effcet/>
            </Body>
            {/* 작품 타이틀*/}
            <Title>{data.title}</Title>
            </a>
          </Post>  
        ))}
      </Container>
      
      {/*Load More 방식 - 페이지 갱신*/}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={fetchNovel}> Load More</button>
      </div>
    </div> 
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
  padding: 100px 0;
  display: grid;
  grid-template-columns: repeat(5, 200px);
  grid-gap: 20px 50px;
  justify-content: center;
  box-sizing: border-box;
`;

const Post = styled.div`
  a:link { color: black; font-weight: bold;}
  a:visited { color: purple; font-weight: bold;}
  a:hover { color: Orange; font-weight: bold;}
  position: relative;
`;
const Img = styled.div`
  border: 1px solid black;
`;

const Title = styled.div`
  padding: 0px 0px;
  //height: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  //border-bottom: 1px black;
`;

const Body = styled.div`
  padding: 2px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Effcet = styled.div`
  border: 2px solid black;
  height: 270px;
  position: relative;
`;

export default RatingAuthorPage

