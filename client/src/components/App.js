import React, { Suspense, useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
//import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import MyPage from './views/MyPgae/MyPage.js';
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import HeaderNav from "./Header/HeaderNav";
// import BoardModal from "./Board/BoardModal";
import NovelPostPage from './views/NovelPostPage/NovelPostPage'
import NovelDetail from './views/NovelDetail/NovelDetail'
import RatingPage from './views/RatingPage/RatingPage'
import SearchPage from './views/SearchPage/SearchPage'
import { useSelector, useDispatch } from "react-redux";
import { auth } from '../_actions/user_actions';
import { menuAction_fetch } from '../_actions/menuActions';
import AlgorithmPage from './views/RecommendPage/AlgorithmPage.js';
import RatingNovelPage from './views/RecommendPage/RatingNovelPage.js';
import RatingAuthorPage from './views/RecommendPage/RatingAuthorPage.js';

import GenrePage from './views/GenrePage/GenrePage.js';
import ViewsPage from './views/RecommendPage/ViewsPage.js';
import RecommendPage from './views/RecommendPage/RecommendPage.js';


//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App(props) {
  //const dispatch = useDispatch();
  const user  = useSelector((state) => state.user);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
// 
// 


  useEffect(() => {
    dispatch(auth())
      .then(response => {
        //console.log(isLogin)
        console.log(user.userData)
        if(response.payload===null){
          //props.history.push('/login')
        }else{
          setIsLogin(true)
        }
      })
  }, []);
  
  useEffect(() => {
    dispatch(menuAction_fetch());
}, [dispatch]);

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <HeaderNav />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={(LandingPage)} />
          <Route exact path="/login" component={(LoginPage)} />
          <Route exact path="/join" component={RegisterPage} />
          <Route exact path="/mypage" component={(MyPage)} />
          
          {/* 소설 관련 페이지 */}
          <Route exact path="/novel" component={NovelPostPage} />  
          <Route exact path="/novel/:id" component={NovelDetail} />  
          
          {/* 추천 소설 관련 페이지 */}
          
          <Route exact path="/recommend" component={RecommendPage} />
          <Route exact path="/recommend/algorithm" component={AlgorithmPage} /> {/*추천 알고리즘 기반 소설 리스트 출력*/}
          <Route exact path="/recommend//ratingNovel" component={RatingNovelPage} /> {/*평점 준 작품 소설 리스트 출력*/}
          <Route exact path="/recommend/ratingAuthor" component={RatingAuthorPage} /> {/*평점 준 작가 기반 소설 리스트 출력*/}
          <Route exact path="/recommend/view" component={ViewsPage} />{/*조회수 기반 소설 리스트 출력 */}
          
          {/* 검색 페이지 */} 
          <Route exact path="/search" component={SearchPage} />
        
          {/* 장르 출력 페이지 */}
          <Route path="/genres/:genre" component={GenrePage} />


        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;