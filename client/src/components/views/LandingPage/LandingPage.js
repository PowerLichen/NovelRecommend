import React, { Fragment, useState, useEffect, useCallback } from 'react'
import Slider from "../Slide/Slider";
import Carousel from "../Slide/SliderCarousel";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_SERVER } from '../../../components/Config.js';
import styled, { createGlobalStyle } from "styled-components";
import Slide from "../../../../node_modules/react-slick";
import { NavLink } from "react-router-dom";
import Layout  from "./Layout";

function LandingPage() {

    const user = useSelector(state => state.user)
    const [last_Posts, setlastPosts] = useState([]);
    const [lastslide, setlastSlide] = useState(0); // 현재 슬라이드
    const [top_Posts, settopPosts] = useState([]);
    const [topslide, settopSlide] = useState(0);

    const handleLClickMove = useCallback((slideNum) => {
        setlastSlide(slideNum);
    }, []);
    const handleTClickMove = useCallback((slideNum) => {
        settopSlide(slideNum);
    }, []);
    useEffect(() => {
        axios
            .get(`${USER_SERVER}/novel/list/1`)
            .then(({ data }) => { setlastPosts(data.slice(0, 10));});

    }, [])
    useEffect(() => {
        axios
            .get(`${USER_SERVER}/novel/list/view/0`)
            .then(({ data }) => { settopPosts(data.slice(0, 10));});

    }, [])

    return (
        <Fragment>
            <Slider />
            <div className="pageTemplate">
            
                <div className="headerNav__item">
                    <NavLink
                        to="/"
                        activeClassName="active"
                    >
                        최신 TOP 10
                    </NavLink>
                </div>

                {/* <Tit   style={{ width: '100%', height: '10vh',textAlign: 'left' }}>
            최신작</Tit> */}
                <div className="slide">
                    <Container>
                        {/* <GlobalStyle />  */}
                        {/* <Slide
                        centerMode={true}
                        centerPadding={0}
                        infinite={true}
                        speed={500}
                        slidesToShow={2}
                        slidesToScroll={1}
                        initialSlide={1}
                        prevArrow={<PrevArrow />}
                        nextArrow={<NextArrow />}
                    > */}
                        {last_Posts.map((data, index) => (
                            <Post key={index} className="slider__slide"
                                style={{ transform: `translateX(${-lastslide * 715}%)` }}>
                                <Body>
                                    <a href={`/novel/${data.id}`}>
                                        {/* 작품 표지 이미지 url */}
                                        <img src={`${data.imgurl}`} width='150' align='center'></img>

                                    </a>
                                </Body>
                                {/* 작품 타이틀*/}
                                <Title>{data.title}</Title>

                            </Post>

                        ))}
                        {/* </Slide> */}
                        <Carousel
                            totalLength={2}
                            currentSlide={lastslide}
                            handleClickMove={handleLClickMove}
                        />
                    </Container>
                </div>
                <div className="headerNav__item">
                    <NavLink
                        to="/"
                        activeClassName="active"
                    >
                        인기작
                    </NavLink>
                </div>

                {/* <Tit   style={{ width: '100%', height: '10vh',textAlign: 'left' }}>
            최신작</Tit> */}
                <div className="slide">
                    <Container>
                        {/* <GlobalStyle />  */}
                        {/* <Slide
                        centerMode={true}
                        centerPadding={0}
                        infinite={true}
                        speed={500}
                        slidesToShow={2}
                        slidesToScroll={1}
                        initialSlide={1}
                        prevArrow={<PrevArrow />}
                        nextArrow={<NextArrow />}
                    > */}
                        {top_Posts.map((data, index) => (
                            <Post key={index} className="slider__slide"
                                style={{ transform: `translateX(${-topslide * 715}%)` }}>
                                <Body>
                                    <a href={`/novel/${data.id}`}>
                                        {/* 작품 표지 이미지 url */}
                                        <img src={`${data.imgurl}`} width='150' align='center'></img>

                                    </a>
                                </Body>
                                {/* 작품 타이틀*/}
                                <Title>{data.title}</Title>

                            </Post>

                        ))}
                        {/* </Slide> */}
                        <Carousel
                            totalLength={2}
                            currentSlide={topslide}
                            handleClickMove={handleTClickMove}
                        />
                    </Container>
                </div>
            </div>   
            <Layout/>
   
        </Fragment>
    );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;
const Container = styled.div`
  min-height: 100vh;
  padding: 50px 100px 0 0px;
  display: grid;
  grid-template-columns: repeat(10, 200px);
  grid-template-rows: repeat(auto-fit, 300px);
  grid-auto-rows: 300px;
  grid-gap: 30px 85px;
  justify-content: center;
  box-sizing: border-box;
  margin: 1px 0 100px 10px
`;
const Post = styled.div`
  border: 1px solid black;
  background: #E2ECFF;
  align-items: center;
  margin:  0 0 0 35%;
  padding: 0px 10px;
  border-radius:8px;
`;

const Title = styled.div`
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px black;
`;

const Body = styled.div`
  height: 80%;
  padding: 11px;
  border-radius: 20px;
  
`;

const Tit = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 10px black;
  font-size:xx-large
`;

const PrevArrow = styled.button`
  width: 38px;
  height: 72px;
  margin-right: 462px;
  right: 50%;
  left: auto;
  :before {
    content: url("/images/img-left.png");
  }
`;

const NextArrow = styled.button`
  width: 38px;
  height: 72px;
  margin-left: 462px;
  left: 50%;
  :before {
    content: url("/images/img-right.png");
  }
`;
export default LandingPage
