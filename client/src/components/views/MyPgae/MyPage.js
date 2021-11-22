import React,{ useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Descriptions } from 'antd';
import axios from "axios";
import { USER_SERVER } from '../../../components/Config.js';
import styled, { createGlobalStyle } from "styled-components";


//마이페이지
function MyPage() {
    const user = useSelector(state => state.user)
    const [Posts, setPosts] = useState([]);
    const [Pages, setPages] = useState([1]);

    useEffect(() => {  
        if(user.userData === undefined)
            return
        axios
          .get(`${USER_SERVER}/novel/mybook/${user.userData.idx}/0`)
          .then(({ data }) => { setPosts(data); });
          
      }, [user])

      const fetchNovel = () => {
      
        setPages(Number(Pages)+1);
    
        fetch(`${USER_SERVER}/novel/mybook/${user.userData.idx}/${Pages}`)
              .then(response => response.json())
              .then(response => {
                  console.log(response)
                  setPosts([...Posts, ...response])
        })
      }


    return (
        
        <div>
            {/* Body*/}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <Descriptions title="내 정보" bordered style={{margin:'5% 10% auto'}}>
                {user.userData &&(
                    <Descriptions.Item label="My ID" style={{padding:'30px'}}>
                        {user.userData.id}
                    </Descriptions.Item>
                )}
                {user.userData &&(
                    <Descriptions.Item label="My Name">
                        {user.userData.nickname}
                    </Descriptions.Item>
                )}
                </Descriptions>
                <Descriptions title="선호 작품" bordered style={{margin:'3% 10% auto'}}>
                {user.userData &&(
                    <Descriptions.Item label="최애 장르" style={{padding:'30px'}}>
                        {user.userData.genre}
                    </Descriptions.Item>
                )}
                </Descriptions>
                <br />
                <Descriptions title="평가한 작품" bordered style={{margin:'5% 10% auto'}}>
                </Descriptions>
                {/* Actors Grid*/}
                <Container>
                    <GlobalStyle />
                    {Posts.map((data, index) => (
                    <Post key={index}>
                        <a href={`/novel/${data.id}`}>
                        <Body>
                        {/* 작품 표지 이미지 url */}
                        <Img>
                            <img src = {`${data.imgurl}`} alt = {data.title} width = '200' height = '280' align = 'center' ></img> 
                        </Img>
                        <Effcet/>
                        </Body>
                        {/* 작품 타이틀*/}
                        <Title>{data.title}</Title>
                        </a>
                    </Post>  
                    ))}
                </Container>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LoadButton onClick={fetchNovel}>Load More</LoadButton>
                </div>
            </div>
        </div>
    )
}

//스타일 영역
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  padding: 25px 0 50px 0;
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
  display: flex;
  justify-content: center;
  align-items: center;
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

const LoadButton = styled.button`
  padding: 6px 12px;
  color: #ffffff;
  border: none;
  border-radius: 50px;
  background-color: #DCDCDC;
  :hover {
    background-color: #F5F5F5;
  }
  cursor: pointer;
`;

export default MyPage;