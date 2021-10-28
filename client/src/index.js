import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';
//import { AUTH_AUTHENTICATED } from "./_actions/types";
import axios from "axios";
import reducers from "./_reducers/index";
// import { authAction_token, authAction_fetchUserData } from "./_actions/user_actions";
// import jwtDecode from "jwt-decode";
//import reducers from 'reducers';

//const reducers = (state, action) => { return state;  };


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
// const store = createStore(reducers, applyMiddleware(ReduxThunk));

// axios.defaults.baseURL = "http://localhost:8080";
// const accessToken = localStorage.accessToken;
// const refreshToken = localStorage.refreshToken;

// if (accessToken) {
//     const decodedToken = jwtDecode(accessToken);

//     // Access Token 만료
//     if (decodedToken.exp * 1000 < Date.now()) {
//         store.dispatch(
//             authAction_token({
//                 token: {
//                     accessToken,
//                     refreshToken,
//                 },
//             })
//         );
//     } else {
//         store.dispatch({ type: AUTH_AUTHENTICATED });
//         axios.defaults.headers.common["Authorization"] = accessToken;
//         store.dispatch(authAction_fetchUserData());
//     }
// }

ReactDOM.render(
  <React.StrictMode>
    <Provider
            store={createStoreWithMiddleware(
            Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__())}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
