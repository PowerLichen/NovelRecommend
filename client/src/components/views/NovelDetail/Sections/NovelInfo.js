import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRatingComponent from 'react-star-rating-component';
import { USER_SERVER } from '../../../../components/Config.js';
import styled, { createGlobalStyle } from "styled-components";
import { Descriptions, Badge } from 'antd';
import RatingPage from "../../RatingPage/RatingPage.js";

//작품 페이지 출력
function NovelInfo(props) {

    const [rating, setRating] = useState([4]);
    const [novels, setNovels] = useState([]);
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        axios
            .get(`${USER_SERVER}/novel/noveldata/${props.nid}`)
            .then(({ data }) => {setNovels(data); setUrls(data.urls); console.log(data); console.log(data.urls)});
      }, [])
    
    function goUrl(url) {
      const str = url;
      if (str.indexOf('naver')>=0) {
        return (
          <a href = {url}>
            <button> 네이버 </button>
          </a>
        )
      }
      else if (str.indexOf('ridibooks')>=0) {
        return (
          <a href = {url}>
            <button> 리디북스 </button>
          </a>
        )
      }
      else if (str.indexOf('kakao')>=0) {
        return (
          <a href = {url}>
            <button> 카카오 </button>
          </a>
        )
      }
      else if (str.indexOf('joara')>=0) {
        return (
          <a href = {url}>
            <button> 조아라 </button>
          </a>
        )
      }
      else {
        return (
          <a href = {url}>
            <button> ??? </button>
          </a>
        )
      }

    }
    
    return (
        <div>

            {/* 작품 이미지 */}
            <Div>
            <Descriptions bordered > 
            <Descriptions.Item span={4}><Font>{novels.title}</Font></Descriptions.Item>
            <Descriptions.Item span={4}><img src = {`${novels.imgurl}`} width = '270' align = 'center'></img></Descriptions.Item>
            
            
            <Descriptions.Item label="작가" >{novels.author_id}</Descriptions.Item>
            <Descriptions.Item label="장르" span={4}>{novels.genre}</Descriptions.Item>
            <Descriptions.Item label="플랫폼 이동" span={4}>
              {urls.map((urls) => (
                goUrl(urls.url)
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="줄거리" span={4}>{novels.description}</Descriptions.Item>
            <Descriptions.Item label="평가하기" span={4}><RatingPage nid = {props.nid}/></Descriptions.Item>
            </Descriptions>
            </Div>


            

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

const Font = styled.div`
  font-weight: bold;
  font-size: 20px;
 
`;
const Div = styled.div`
  width: 800px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
const Div2 = styled.div`
  width: 200px;
`;
const Center = styled.div`
  
  align = center;
`;

export default NovelInfo
