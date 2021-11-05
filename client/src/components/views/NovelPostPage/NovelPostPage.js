import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import { USER_SERVER } from '../../../components/Config.js';



//작품출력
function NovelPostPage(props) {
    
  const [Posts, setPosts] = useState([]);
  const [Pages, setPages] = useState([1]);
    
    useEffect(() => {

      axios
        .get(`${USER_SERVER}/novel/list/0`)
        .then(({ data }) => { setPosts(data); console.log(data);});
        
    }, [])

    //소설 포스트 페이지 갱신
    const fetchNovel = () => {
      
      setPages(Number(Pages)+1);

      fetch(`${USER_SERVER}/novel/list/${Pages}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setPosts([...Posts, ...response])     
                //setCurrentPage(response.page)
      })
    }

    return (
      <div>
        <Container>
          <GlobalStyle />
          {Posts.map((data, index) => (
            <Post key={index}>
               <a href={`/novel/${data.id}`}>
              <Body>
                  {/* 작품 표지 이미지 url */}
                  <img src = {`${data.imgurl}`} width = '150' align = 'center'></img> 
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
