import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRatingComponent from 'react-star-rating-component';


//작품 페이지 출력
function NovelInfo(props) {

    let { novel } = props;

    const [rating, setRating] = useState([4]);
    


    return (
        <div>
            
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/* 작품 이미지 */}
            <img src = 'https://cdn.kado.net/news/photo/202004/1018454_448598_1539.jpg' width = '300' align = 'left'></img> {/*임시 이미지*/}
            
            <h1> 타이틀</h1> {/*{novel.title}*/}
            <div align="left"  >
                <StarRatingComponent 
                        name="rate2" 
                        editing={false}
                        starCount={5}
                        value={rating}
                    />
                <h3> 평점                {rating} </h3> 
            </div>
            <h2> 장르  :  {/*{novel.title}*/}</h2>
            <h2> 주소  :  {/*{novel.title}*/}</h2>
            <h2> 줄거리   {/*{novel.title}*/}</h2>
            <p></p> {/*줄거리 출력란*/}

        </div>
        
      )
}


export default NovelInfo
