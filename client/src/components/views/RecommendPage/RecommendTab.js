import React, { useState, Fragment } from 'react';
import styled from 'styled-components';

import { NavLink, Switch, Route ,BrowserRouter as Router } from 'react-router-dom';

export const RecommendTab = () => {
    // TIP: Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한
    // currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0 입니다.
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
  //background-color: #dcdcdc;
  color: rgba(73, 73, 73, 0.5);
  //font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  //margin-bottom: 7rem;
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