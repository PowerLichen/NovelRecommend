import React from 'react'
import { FaCode } from "react-icons/fa";

function LandingPage() {
    
    return (
        <>
            <div className="app">
                <FaCode style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem' }}>소설 추천 사이트!</span>
            </div>
            <div style={{ float: 'left' }}>소설 추천 사이트의 메인 페이지 입니다.</div>
        </>
    )
}

export default LandingPage
