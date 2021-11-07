import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import { gray } from "../LandingPage/color";
library.add(fab);

function Footer(props) {
    
      const btnStyle = {
        margin: '30px 10px',
        color: "white",
        background: "#71A3FF",
        padding: ".375rem .75rem",
        border: "1px solid teal",
        borderRadius: ".25rem",
        fontSize: "1rem",
        lineHeight: 1.5,
      };
      const user = useSelector(state => state.user)

      const RecHandler = (event) => {
      if ((!!user.userData)===true) {

      }
      else{
        alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.')
        props.history.push('/login');
      }
    }
    return (
        
        <div className="footer">
        <div className="container">
            <div className="footer__left">
                <h1>웹소설 추천, NR</h1>
                <ul>
                    <li>
                        <Link to="/">서비스 이용약관</Link>
                    </li>
                    <li>
                        <Link to="/">개인정보처리방침</Link>
                    </li>
                    <li>
                        <Link to="/">운영/관리방침</Link>
                    </li>
                    <li>
                        <Link to="/">고객서비스센터</Link>
                    </li>
                    <li>
                        <Link to="/">기업소개</Link>
                    </li>
                </ul>

                <p>팀NR 경상북도 경산시 대학로 대표이사 최민수</p>
                <p>사업자 등록번호 000-00-00000 </p>
                <p>통신판매신고번호 2000-대구-0000</p>
                <p>제품 문의 : 080-000-0000 FAX 00-0000-0000</p>
                <p>이메일 주소 ssvsxx@naver.com</p>
                <p>비즈니스제휴/입점문의 ssvsxx@naver.com</p>
                <p>호스팅 서비스 제공자 ㈜NR</p>

                <p>Copyright © 2021 NR. All Rights Reserved.</p>
            </div>
            
                <div className="footer__right">
                    <FontAwesomeIcon icon={["fab", "facebook"]} className="facebook" size="2x" />
                    <FontAwesomeIcon icon={["fab", "instagram"]} className="instagram" size="2x" />
                    <FontAwesomeIcon icon={["fab", "youtube"]} className="youtube" size="2x" />
                    <FontAwesomeIcon icon={["fab", "twitter"]} className="twitter" size="2x" />
                    {/* <FontAwesomeIcon icon={["fab", "google"]} className="google" size="2x"/> */}
                    <a onClick={() => window.open('https://github.com/LeeKwang-min/2021SeniorProject', '_blank')}>
                        <FontAwesomeIcon icon={['fab', 'github']} className="github" size="2x" /></a>
                    {/* <i class="fab fa-facebook-square"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-youtube"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fas fa-mobile-alt"></i> */}

                    <div className="footer__rightContent">
                        <div>회원이시라면...</div>
                        
                        지금 웹소설을 평가하고,
                        내 취향에 딱 맞는 웹소설을 추천 받아보세요!
                    </div>
                    {/* <div
                        style={{ background: 'skyblue', display: 'flex', justifyContent: 'center', margin: '2rem' }}
                    > */}
                    <ContentWrap>
                        <button className="overseas-remittance-link" onClick={RecHandler}>평가하고 추천받기</button>
                {/* </div> */}</ContentWrap>
            </div>
        </div>
    </div>
    );
}
const ContentWrap = styled.div`
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
  .footer__rightContent{
    
}
  `;


export default withRouter(Footer)
