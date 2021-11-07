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
import RecommendPostPage from './views/RecommendPostPage/RecommendPostPage.js';

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
          <Route exact path="/join" component={(RegisterPage)} />
          <Route exact path="/mypage" component={(MyPage)} />
          {/* <Route exact path="/community" component={(BoardModal)} /> */}
          <Route exact path="/novel" component={NovelPostPage} />  
          <Route exact path="/novel/:id" component={NovelDetail} /> 
          <Route exact path="/recommend" component={RecommendPostPage} /> 

          <Route exact path="/rating" component={RatingPage} /> 
          <Route exact path="/search" component={SearchPage} />

        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;