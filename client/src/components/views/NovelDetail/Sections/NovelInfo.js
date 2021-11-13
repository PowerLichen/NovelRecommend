import React, { useState, useEffect } from "react";
import axios from "axios";
import { USER_SERVER } from '../../../../components/Config.js';
import styled from "styled-components";
import { Descriptions } from 'antd';
import RatingPage from "../../RatingPage/RatingPage.js";

import naverseries from "../../../../images/naverseries-app-icon.png";
import kakaopage from "../../../../images/kakaopage-app-icon.png";
import ridibooks from "../../../../images/ridibooks-app-icon.png";
import joara from "../../../../images/joara-app-icon.png";


//작품 페이지 출력
function NovelInfo(props) {

    const [novels, setNovels] = useState([]);
    const [urls, setUrls] = useState([]);
    const [tags, setTags] = useState([]);

    const [tagId, settagId] = useState([]);

    useEffect(() => {
        axios
            .get(`${USER_SERVER}/novel/noveldata/${props.nid}`)
            .then(({ data }) => {setNovels(data); setUrls(data.urls); setTags(data.tags); console.log(data); console.log(data.urls); console.log(data.tags);});
        axios.get(`${USER_SERVER}/novel/hit/${props.nid}`)
      }, [])
    
    function goUrl(url) {
      const str = url;

      if (str.indexOf('naver')>=0) {
        return (
          <a href = {url}>
            <img src = {naverseries} width = '50' alt="네이버시리즈" align = 'center' style={{margin: '5px' }}></img>
          </a>
        )
      }
      else if (str.indexOf('ridibooks')>=0) {
        return (
          <a href = {url}>
            <img src = {ridibooks} width = '50' alt="리디북스" align = 'center' style={{margin: '5px' }}></img>
          </a>
        )
      }
      else if (str.indexOf('kakao')>=0) {
        return (
          <a href = {url}>
            <img src = {kakaopage} width = '50' alt="카카오페이지" align = 'center' style={{margin: '5px' }}></img>
          </a>
        )
      }
      else if (str.indexOf('joara')>=0) {
        return (
          <a href = {url}>
            <img src = {joara} width = '50' alt="조아라" align = 'center' style={{margin: '5px' }}></img>
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
        <Descriptions layout="vertical" bordered >
          <Descriptions.Item span={4}><Font>{novels.title}</Font> <RatingPage nid={props.nid} /> </Descriptions.Item>
          <Descriptions.Item span={4}>
            <img src={`${novels.imgurl}`} width='270' style={{ margin: '0 30%', border: '1px solid #dcdcdc'}}></img>
          </Descriptions.Item>
          <Descriptions.Item label="작가" >{novels.name}</Descriptions.Item>
          <Descriptions.Item label="장르" >{novels.genre}</Descriptions.Item>
          <Descriptions.Item label="플랫폼 이동하기" span={3}>
            {urls.map((urls) => (
              goUrl(urls.url)
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="줄거리" span={3}>{novels.description}</Descriptions.Item>
          <Descriptions.Item label="태그" span={3}> 
            
              {tags.map((tags, idx) => (
                <a href = {`/tag/${tags.tag}`}>
              <Tags>
                #{tags.tag}
               
              </Tags>
              </a>
              ))}
          </Descriptions.Item>
        </Descriptions>
      </div>   
    );
}

const Font = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

const Tags = styled.button`
  margin: 0 5px 5px 0;
  padding: 6px 12px;
  color: white;
  border: none;
  border-radius: 50px;
  background-color: #74b9ff;
  :hover {
    background-color: #99c6f5;
  }
`;

export default NovelInfo
