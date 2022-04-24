/*
 * @Author: Lee
 * @Date: 2022-04-24 17:10:13
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-24 17:27:08
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
