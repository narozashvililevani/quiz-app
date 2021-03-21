import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// store
import { Provider } from 'react-redux'
import {configureStore } from '@reduxjs/toolkit'

import rootReducer from './Slices/index';
const store = configureStore({ reducer: rootReducer})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


