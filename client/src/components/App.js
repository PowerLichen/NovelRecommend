import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
//import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import HeaderNav from "./Header/HeaderNav";
import NovelPostPage from './views/NovelPostPage/NovelPostPage'
import NovelDetail from './views/NovelDetail/NovelDetail'
import RatingPage from './views/RatingPage/RatingPage'
import { useSelector, useDispatch } from "react-redux";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  //const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (!user.id) {
                return <LoginPage />;
            }

            if (Component) {
                return <Component {...props} />;
            }
        }}
    />
);
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <HeaderNav />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <AuthRoute exact path="/" component={(LandingPage, null)} />
          <Route exact path="/login" component={(LoginPage)} />
          <Route exact path="/join" component={RegisterPage} />
          <Route exact path="/novel" component={NovelPostPage} />  
          <Route exact path="/novel/:id" component={NovelDetail} /> 
          <Route exact path="/rating" component={RatingPage} /> 
          
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;