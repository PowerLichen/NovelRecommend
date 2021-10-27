import React from "react";

const SliderImg = ({ src }) => {
    return <img src={src} alt="slide-img" className="slider__image"></img>;
};

export default React.memo(SliderImg);
