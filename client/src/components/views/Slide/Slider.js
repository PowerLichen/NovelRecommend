import React, { useState, useEffect, useCallback } from "react";
import ImgComp from "./SliderImg";
import i1 from "../../../images/1.jpg";
import i2 from "../../../images/2.jpg";
import i3 from "../../../images/3.jpg";
import i4 from "../../../images/4.jpg";
import Carousel from "./SliderCarousel";

const Slider = () => {
    let sliderArr = [
        <ImgComp src={i1} />,
        <ImgComp src={i2} />,
        <ImgComp src={i3} />,
        <ImgComp src={i4} />,
    ];

    const [slide, setSlide] = useState(0); // 현재 슬라이드
    const [isMouseOn, setMouseOn] = useState(false); // 마우스 오버 여부
    // 왼쪽으로 넘기기
    const onClickLeft = useCallback(() => {
        slide === 0
            ? setSlide(sliderArr.length - 1) // 첫번째 슬라이드 일 경우, 제일 마지막 슬라이드로 이동
            : setSlide(slide - 1);
    }, [sliderArr, slide]);

    const onClickRight = useCallback(() => {
        slide === sliderArr.length - 1
            ? setSlide(0) // 마지막 슬라이드 일경우, 첫번째 슬라이드로 이동
            : setSlide(slide + 1);
    }, [sliderArr, slide]);

    // 마우스 오버
    const onMouseEnter = useCallback(() => {
        setMouseOn(true);
    }, []);

    // 마우스 아웃
    const onMouseLeave = useCallback(() => {
        setMouseOn(false);
    }, []);

    const handleClickMove = useCallback((slideNum) => {
        setSlide(slideNum);
    }, []);

    // 3초 마다 슬라이드 이동
    useEffect(() => {
        if (!isMouseOn) {
            // 마우스 오버시에만 3초 타이머 작동
            const loop = setInterval(() => {
                onClickRight();
            }, 3000);
            return () => clearInterval(loop);
        }
    }, [isMouseOn, onClickRight]);

    return (
        <div
            className="slider"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {sliderArr.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="slider__slide"
                        style={{ transform: `translateX(${-slide * 100}%)` }}
                    >
                        {item}
                    </div>
                );
            })}
            <button className="slider__buttonLeft" onClick={onClickLeft}>
                <i className="fas fa-chevron-left"></i>
            </button>
            <button className="slider__buttonRight" onClick={onClickRight}>
                <i className="fas fa-chevron-right"></i>
            </button>
            {/* 캐러셀 추가 */}
            <Carousel
                totalLength={4}
                currentSlide={slide}
                handleClickMove={handleClickMove}
            />
        </div>
    );
};

export default React.memo(Slider);
