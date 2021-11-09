import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { NavLink, Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import axios from "axios";
import { USER_SERVER } from '../../Config.js';
import { useSelector } from "react-redux";

import AlgorithmPage from "./AlgorithmPage";
import RatingAuthorPage from "./RatingAuthorPage";
import ViewsPage from "./ViewsPage";

import RecommendTab from "./RecommendTab";

import RatingNovelPage from './RatingNovelPage.js';

function RecommendPage(props) {

    const [color, setColor] = useState("black");

    const changeMenu = (menuIndex) =>{
        this.setState({menu : menuIndex});
    }

    const user = useSelector(state => state.user)
    const RecHandler = (event) => {
      if ((!!user.userData)===true) {

      }
      else{
        alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.')
        props.history.push('/login');
      }
    }

    useEffect(() => {
        if (user.userData === undefined) {
          return 
        }
        if (user.userData === null) {
          return RecHandler();
        }

        
      }, [])

    return (
        <div>
        <RecommendTab/>
        <Router>
            <Switch>
                <Route exact path="/recommend/algorithm" component={AlgorithmPage} /> {/*추천 알고리즘 기반 소설 리스트 출력*/}
                <Route exact path="/recommend/ratingAuthor" component={RatingAuthorPage} /> {/*평점 준 작가 기반 소설 리스트 출력*/}
                <Route exact path="/recommend/view" component={ViewsPage} />{/*조회수 기반 소설 리스트 출력 */}
            </Switch>
        </Router>
        </div>
    );
}

export default RecommendPage
