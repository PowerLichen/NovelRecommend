import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
 
function RatingPage(props) {
  
    const [rating, setRating] = useState([4]);
    
 
    const onStarClick = (nextValue) => {
        setRating(nextValue);
    }


    return (         
      <div >
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <h2>평점 선택 : {rating}</h2>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={onStarClick}
        />
        <br></br>
        <input type='submit'></input>
        
      </div>
        
      
    );
  
}

export default RatingPage