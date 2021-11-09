import React, { useState, useEffect } from "react";
import NovelInfo from "./Sections/NovelInfo";
import RatingPage from "../RatingPage/RatingPage";

//작품 페이지 출력
function NovelDetail(props) {

    const nidUrl = useState((window.location.pathname).slice(7));
 
    return (
        <div>
            <NovelInfo nid = {nidUrl}></NovelInfo>
            <RatingPage nid = {nidUrl}></RatingPage>
        </div>
        
    )
}



export default NovelDetail
