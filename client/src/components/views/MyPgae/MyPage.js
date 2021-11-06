import React,{ useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import MyInfo from './MyInfo';
import { Descriptions } from 'antd';
import axios from "axios";
import { USER_SERVER } from '../../../components/Config.js';
import styled, { createGlobalStyle } from "styled-components";

function MyPage() {
    const user = useSelector(state => state.user)
    console.log(user.userData)
    const [Posts, setPosts] = useState([]);
    const [Pages, setPages] = useState([1]);
    useEffect(() => {  
        if(user.userData === undefined)
            return
        axios
          .get(`${USER_SERVER}/novel/mybook/${user.userData.idx}/1`)
          .then(({ data }) => { setPosts(data); console.log(data);});
          
      }, [user])

    return (
        
        <div>
            {/* Body*/}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                {/* My Info*/}
{/*                 
                <Descriptions title="My Info" bordered>
                
                    <MyInfo user={user} />
                </Descriptions> */}
                
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
                {/* Actors Grid*/}
                <Container>
                    <GlobalStyle />
                    {Posts.map((data, index) => (
                        <Post key={index}>
                            <Body>
                                <a href={`/novel/${data.id}`}>
                                    {/* 작품 표지 이미지 url */}
                                    <img src={`${data.imgurl}`} width='150' align='center'></img>

                                </a>
                            </Body>
                            {/* 작품 타이틀*/}
                            <Title>{data.title}</Title>

                        </Post>

                    ))}
                </Container>
                <div
                    style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}
                >
                    <button> More Information</button>
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
  padding: 50px 100px 0 0;
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
  align-items: center;
  margin:  0 0 0 35%;
  padding: 0px 10px;
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

export default MyPage;