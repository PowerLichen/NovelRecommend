import React, { Suspense, useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import MyPage from './views/MyPgae/MyPage.js';
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import HeaderNav from "./Header/HeaderNav";
import NovelPostPage from './views/NovelPostPage/NovelPostPage'
import NovelDetail from './views/NovelDetail/NovelDetail'
import SearchPage from './views/SearchPage/SearchPage'
import { useSelector, useDispatch } from "react-redux";
import { auth } from '../_actions/user_actions';
import { menuAction_fetch } from '../_actions/menuActions';
import AlgorithmPage from './views/RecommendPage/AlgorithmPage.js';
import RatingAuthorPage from './views/RecommendPage/RatingAuthorPage.js';
import GenrePage from './views/GenrePage/GenrePage.js';
import ViewsPage from './views/RecommendPage/ViewsPage.js';
import RecommendPage from './views/RecommendPage/RecommendPage.js';
import TagPage from './views/TagPage/TagPage.js';


//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App(props) {

  const user  = useSelector((state) => state.user);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth())
      .then(response => {
        console.log(user.userData)
        if(response.payload===null){

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
          <Route exact path="/novel/:nid" component={NovelDetail} />
          
          {/* 추천 소설 관련 페이지 */}
          <Route exact path="/recommend" component={RecommendPage} />
          <Route exact path="/recommend/algorithm" component={AlgorithmPage} /> 
          <Route exact path="/recommend/ratingAuthor" component={RatingAuthorPage} /> 
          <Route exact path="/recommend/view" component={ViewsPage} />
          
          {/* 검색 페이지 */} 
          <Route exact path="/search" component={SearchPage} />
        
          {/* 장르 출력 페이지 */}
          <Route path="/novel/genres/:genre" component={GenrePage} />

          {/*태그 출력 페이지*/}
          <Route path="/tag/:keyword" component={TagPage} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;