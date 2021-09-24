import React, { useState, useEffect } from "react";
import { Row, Button } from 'antd';
import axios from "axios";
import NovelInfo from "./Sections/NovelInfo";

//작품 페이지 출력
function NovelDetail(props) {

    const [Novel, setMovie] = useState([]);
    //const [url, setUrl] = useState((window.location.pathname).slice(7));
    const url = useState((window.location.pathname).slice(7));

    // const urlsplit = (event) => {
    //     url = window.location.pathname;
    //     url = url.slice(6);
    //     console.log(url);
    // }
    
    // function urlspliting() {
    //     url = window.location.pathname;
    //     url = url.slice(6);
    //     console.log(url);
    // }

    // const urlHandler = ()=>{
    //     url = window.location.pathname;
    //     url = url.slice(6);
    //     console.log(url);
    // }

    useEffect(() => {
        //console.log(url);

    });
      
    return (
        <div>
        <NovelInfo id = {url}></NovelInfo>
        
        안녕
        
        {url}
        
        </div>
        
    )
}



export default NovelDetail
