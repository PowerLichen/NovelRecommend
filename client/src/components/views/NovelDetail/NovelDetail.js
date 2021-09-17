import React, { useState, useEffect } from "react";
import { Row, Button } from 'antd';
import axios from "axios";
import NovelInfo from "./Sections/NovelInfo";

//작품 페이지 출력
function NovelDetail(props) {

    const [Novel, setMovie] = useState([])

    return (
        
        <NovelInfo></NovelInfo>

    )
}



export default NovelDetail
