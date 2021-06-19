import React from 'react';
import ReactDOM from 'react-dom';
import {FireBaseContext} from "./store/fireBasecontext"
import './index.css';
import firebase from "./fireBase/config"
import App from './App';
import Context from "./store/fireBasecontext"
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Context>
    <FireBaseContext.Provider value={{firebase}} >
    <App />
    </FireBaseContext.Provider>
    </Context>
  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
