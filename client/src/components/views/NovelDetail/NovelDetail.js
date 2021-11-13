import React, { useState } from "react";
import NovelInfo from "./Sections/NovelInfo";

//작품 페이지 출력
function NovelDetail(props) {

    const nidUrl = useState((window.location.pathname).slice(7));
 
    return (
        <div style={{ width: '800px', margin: '1rem auto' }}>
            <div>
            <NovelInfo nid = {nidUrl}></NovelInfo>
            </div>
        </div>
        
    )
}

export default NovelDetail
