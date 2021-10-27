import React from "react";

function SliderCarousel({ totalLength, currentSlide, handleClickMove }) {
    const items = [...new Array(totalLength).keys()];

    return (
        // 현재 슬라이드와 일치하는 캐러셀 active
        <div className="sliderCarousel">
            {items.map((_, index) => (
                <div
                    key={index}
                    className={`sliderCarousel__item ${
                        index === currentSlide && "active"
                    }`}
                    onClick={() => handleClickMove(index)}
                ></div>
            ))}
        </div>
    );
}

export default React.memo(SliderCarousel);
