/*
 * @Author: Lee
 * @Date: 2023-02-07 09:40:12
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-10 11:44:34
 * @Description:
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './router';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import { AppContext } from './context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <AppContext.Provider value={{ name: '张三', job: '程序猿' }}>
    <RouterProvider router={router} />
  </AppContext.Provider>
  // </React.StrictMode>
);
