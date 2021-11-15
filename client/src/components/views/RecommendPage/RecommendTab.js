import React, { useState, Fragment } from 'react';
import styled from 'styled-components';

import { NavLink ,BrowserRouter as Router } from 'react-router-dom';


//추천받기페이지 탭
export const RecommendTab = () => {
    
    const [currentTab, setCurrentTab] = useState(0);
    
    const menuArr = [
      { name: '조회수 기반 추천', path: "/recommend/view", tooltip: "조회수가 가장 높은 소설을 기반으로 작품을 추천" },
      { name: '평가 기반 추천', path: "/recommend/ratingAuthor", tooltip: "평가한 작품을 기반으로, 해당 작품의 작가가 쓴 다른 작품을 추천"},
      { name: 'AI 기반 추천', path: "/recommend/algorithm", tooltip:"평가한 작품을 기반으로, 세부 알고리즘을 적용한 추천" },
    ];
    
    const selectMenuHandler = (index) => {
      setCurrentTab(index);
    };
    return (
        <div>   
            <TabMenu>
                {menuArr.map((menu, idx) => (
                  <Fragment key={menu.path}>
                    <NavLink className='submenu' activeClassName='submenu focused' to={menu.path} onClick={() => selectMenuHandler(idx)} data-tooltip-text={menu.tooltip}> {menu.name} 
                    </NavLink>
                  </Fragment>
                ))}
          </TabMenu>
        </div>

    );
  };

const TabMenu = styled.ul`
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  a:hover {
    color: #ffffff;
    background-color: #f4ac19;
  }
.submenu {
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  padding-left: 0.9rem;
  text-align: center;
  padding-right: 0.9rem;
  margin-right: 20px;
  cursor: pointer;
  border-radius: 5px;
  color: #f4ac19;
}
.focused {
  color: #ffffff;
  background-color: #f4ac19;
}

[data-tooltip-text]:hover {
	position: relative;
}

[data-tooltip-text]:hover:after {
	background-color: #000000;
	background-color: rgba(0, 0, 0, 0.8);

	-webkit-box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
	-moz-box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
	box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);

	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;

	color: #ffffff;
	font-size: 12px;
	content: attr(data-tooltip-text);

  margin-bottom: 10px;
	top: 130%;
	left: 0;    
	padding: 4px 0px;
	position: absolute;
	width: auto;
	min-width: 400px;
	max-width: 300px;
	word-wrap: break-word;

	z-index: 9999;
}

`;

export default RecommendTab;