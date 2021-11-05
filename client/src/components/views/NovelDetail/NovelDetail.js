import React, { useState, useEffect } from "react";
import NovelInfo from "./Sections/NovelInfo";
import RatingPage from "../RatingPage/RatingPage";

//작품 페이지 출력
function NovelDetail(props) {

    const [Novel, setMovie] = useState([]);
    const url = useState((window.location.pathname).slice(7));


    useEffect(() => {


    });
      
    return (
        <div>
        <NovelInfo id = {url}></NovelInfo>
        <RatingPage id = {url}></RatingPage>
        </div>
        
    )
}



export default NovelDetail
