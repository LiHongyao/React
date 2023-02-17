/*
 * @Author: Lee
 * @Date: 2023-02-08 13:34:39
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-10 10:05:10
 * @Description:
 */

import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

// -- previous imports
import Layouts from 'src/layouts';
import ErrorPage from 'src/views/ErrorPage';
import IndexPage from 'src/views/IndexPage';
import About from 'src/views/About';
import Mine, { loader as mineLoader /** 新增 */ } from 'src/views/Mine';
import Login from 'src/views/Login';
import Hooks from 'src/views/Hooks';
import Basic from 'src/views/Basic';

// -- lazy imports
const Details = React.lazy(() => import('src/views/Details'));

// -- create routes
const routes: Array<RouteObject> = [
  {
    path: '/',
    element: <Layouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { path: '/basic', element: <Basic /> },
          { path: '/index-page', element: <IndexPage /> },
          { path: '/about', element: <About /> },
          { path: '/hooks', element: <Hooks /> },
          { path: '/mine', element: <Mine />, loader: mineLoader },
          { path: '/details/:id?', element: <Details /> },
        ],
      },
    ],
  },
  { path: '/login', element: <Login /> },
];
// -- create routers
const router = createBrowserRouter(routes, {
  basename: '',
});

export default router;
