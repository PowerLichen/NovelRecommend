import React from "react";
import NovelInfo from "./NovelInfo";


//작품 상세 페이지
function NovelDetail(props) {
    
    let nid = props.match.params.nid;

    return (
        <div style={{ width: '800px', margin: '1rem auto' }}>
            <div>
            <NovelInfo nid = {nid}></NovelInfo>
            </div>
        </div>
        
    )
}

export default NovelDetail
