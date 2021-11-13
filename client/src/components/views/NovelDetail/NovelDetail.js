import React, { useState } from "react";
import NovelInfo from "./Sections/NovelInfo";

//작품 페이지 출력
function NovelDetail(props) {
    
    let nid = props.match.params.id;

    return (
        <div style={{ width: '800px', margin: '1rem auto' }}>
            <div>
            <NovelInfo nid = {nid}></NovelInfo>
            </div>
        </div>
        
    )
}

export default NovelDetail
