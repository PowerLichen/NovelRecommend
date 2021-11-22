import React, { Fragment, useState, useEffect, useCallback } from 'react'
import Slider from "../Slide/Slider";
import Carousel from "../Slide/SliderCarousel";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_SERVER } from '../../../components/Config.js';
import styled from "styled-components";
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

                <div className="slide">
                    <Container>
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

                <div className="slide">
                    <Container>
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

export default LandingPage
