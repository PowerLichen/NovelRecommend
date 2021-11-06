import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styled from "../../../../node_modules/styled-components";
import { gray, white } from "./color";

const SectionContainer = styled.section`
  height: 750px;
  background: url("/images/home_map.png") no-repeat -2% center;
  background-color: ${white};
  .section-wrap {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .section-wrap > img {
    width: 373px;
    margin-right: 27px;
  }
  .section-wrap > img.fly {
    animation: fly 2s forwards;
  }
  @keyframes fly {
    from {
      margin-top: 300px;
      opacity: 0;
    }
    to {
      margin-top: 0;
      opacity: 1;
    }
  }
`;

const ContentWrap = styled.div`
  text-align: left;
  margin: 0 20px;
  h3 {
    font-size: 40px;
    line-height: 1.25em;
  }
  p {
    color: ${gray[1]};
    font-size: 15px;
    line-height: 1.5em;
    margin-top: 20px;
  }
  .overseas-remittance-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 258px;
    height: 56px;
    font-size: 16px;
    background-color: ${gray[4]};
    border-radius: 10px;
    text-decoration: none;
    margin-top: 30px;
  }
  .overseas-remittance-link:hover {
    text-decoration: underline;
  }
  .overseas-remittance-link img {
    width: 6px;
    height: 9px;
    margin-left: 8px;
  }
`;

const Layout = () => {
  const [playAnimate, setPlayAnimate] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY || window.pageYOffset;
    if (offset > 3400) return setPlayAnimate(true);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <SectionContainer>
      <div className="section-wrap">
        <img
          className={classNames({ fly: playAnimate })}
          src="/images/main1.png"
          alt=""
        />
        {/* <img
          // className={classNames({ fly: playAnimate })}
          src="/images/main.png"
          alt=""
        /> */}
        <div className="content">
          <ContentWrap>
            <h3>
              장르별 웹소설과
              <br />
              취향저격 웹소설을
              <br />더 쉽고, 간편하게
            </h3>
            <p>
              각 웹소설사이트의 웹소설을 포함하여
              <br />
              취향에 맞는 개인추천으로
              <br />
              내게 딱 맞는 소설 찾기가 가능합니다.
            </p>
            <a
              href="/novel"
              className="overseas-remittance-link"
            >
              웹소설 전체보기
              <img src="/images/home_arr.png" alt=""></img>
            </a>
          </ContentWrap>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Layout;
