import React, { useState, Fragment } from 'react';
import styled from 'styled-components';

import { NavLink ,BrowserRouter as Router } from 'react-router-dom';


//추천하기페이지 탭
export const RecommendTab = () => {
    
    const [currentTab, setCurrentTab] = useState(0);
    
    const menuArr = [
      { name: '조회수 기반 추천', path: "/recommend/view"},
      { name: '평가 기반 추천', path: "/recommend/ratingAuthor"},
      { name: 'AI 기반 추천', path: "/recommend/algorithm" },
    ];
    
    const selectMenuHandler = (index) => {
      setCurrentTab(index);
    };
    return (
        <div>   
            <TabMenu>
                {menuArr.map((menu, idx) => (
                  <Fragment key={menu.path}>
                    <NavLink className='submenu' activeClassName='submenu focused' to={menu.path} onClick={() => selectMenuHandler(idx)}> {menu.name} 
                    </NavLink>
                  </Fragment>
                ))}
          </TabMenu>
        </div>

    );
  };

const TabMenu = styled.ul`
  color: rgba(73, 73, 73, 0.5);
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
.submenu {
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  padding-left: 0.9rem;
  text-align: center;
  padding-right: 0.9rem;
  margin-right: 20px;
  cursor: pointer;
  border-radius: 2px;
  color: #f4ac19;
  border: 1px solid #f4ac19;
}
.focused {
  color: #ffffff;
  background-color: #f4ac19;
}
& div.desc {
  text-align: center;
}
`;




export default RecommendTab;