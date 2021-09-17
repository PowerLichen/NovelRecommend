import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
//import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"

import NovelPostPage from './views/NovelPostPage/NovelPostPage'
import NovelDetail from './views/NovelDetail/NovelDetail'
import RatingPage from './views/RatingPage/RatingPage'

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={(LandingPage, null)} />
          <Route exact path="/login" component={(LoginPage)} />
          <Route exact path="/join" component={RegisterPage} />

          <Route exact path="/Novle" component={NovelPostPage} />  
          {/* <Route exact path="/novle/:id" component={(NovelDetail, null)} />  */}
          <Route exact path="/NovleDetail" component={NovelDetail} />  
          <Route exact path="/rating" component={RatingPage} /> 
          
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
