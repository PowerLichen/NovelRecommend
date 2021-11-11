import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { NavLink, Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import axios from "axios";
import { USER_SERVER } from '../../Config.js';
import { useSelector } from "react-redux";

import AlgorithmPage from "./AlgorithmPage";
import RatingAuthorPage from "./RatingAuthorPage";
import ViewsPage from "./viewsPage";

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
                <Route exact path="/recommend/algorithm" component={AlgorithmPage} /> 
                <Route exact path="/recommend/ratingAuthor" component={RatingAuthorPage} />
                <Route exact path="/recommend/view" component={ViewsPage} />
            </Switch>
        </Router>
        
        </div>
    );
}

export default RecommendPage
