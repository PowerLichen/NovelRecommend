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
import RecommendAlgorithmPage from './views/RecommendPage/RecommendAlgorithmPage.js';
import RatingNovelPage from './views/RecommendPage/RatingNovelPage.js';
import RatingAuthorPage from './views/RecommendPage/RatingAuthorPage.js';
import viewsPage from './views/RecommendPage/viewsPage.js';
import GenrePage from './views/GenrePage/GenrePage.js';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App(props) {
  //const dispatch = useDispatch();
  const user  = useSelector((state) => state.user);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

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

  // useEffect(() => {
  //   if(localStorage.getItem('usertoken') === null){
  //   // localStorage 에 usertoken 라는 key 값으로 저장된 값이 없다면
  //     console.log('isLogin ?? :: ', isLogin)
  //   } else {
  //   // localStorage 에 usertoken 라는 key 값으로 저장된 값이 있다면
  //   // 로그인 상태 변경
  //     setIsLogin(true)
  //     console.log('isLogin ?? :: ', isLogin)
  //   }
  // })

//   const AuthRoute = ({ component: Component, ...rest }) => (
//     <Route
//         {...rest}
//         render={(props) => {
//             if (!!user.userData!==false) {
//                 return <LoginPage />;
//             }

//             if (Component) {
//                 return <Component {...props} />;
//             }
//         }}
//     />
// );
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
          <Route exact path="/algorithm" component={RecommendAlgorithmPage} /> {/*추천 알고리즘 기반 소설 리스트 출력*/}
          <Route exact path="/ratingNovel" component={RatingNovelPage} /> {/*평점 준 작품 소설 리스트 출력*/}
          <Route exact path="/ratingAuthor" component={RatingAuthorPage} /> {/*평점 준 w 소설 리스트 출력*/}
          <Route exact path="/view" component={viewsPage} />{/*조회수 기반 소설 리스트 출력 */}
          
          {/* 검색 페이지 */} 
          <Route exact path="/search" component={SearchPage} />
        
          {/* 장르 출력 페이지 */}
          <Route exact path="/genre" component={GenrePage} />

        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;