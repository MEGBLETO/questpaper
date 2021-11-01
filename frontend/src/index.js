import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import { Provider } from 'react-redux'
import loginReducer from './features/Login'
import App from './App';

//redux logic

import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {

    //I called my reducer login gence why im accessing in nav like that
    login: loginReducer,
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
