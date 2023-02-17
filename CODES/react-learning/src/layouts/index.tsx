/*
 * @Author: Lee
 * @Date: 2023-02-08 14:02:48
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-10 10:04:36
 * @Description:
 */

import React from 'react';
import { Outlet, NavLink, useNavigation } from 'react-router-dom';
import './index.css';

const Layouts: React.FC = () => {
  const navigation = useNavigation();
  return (
    <div className='layouts'>
      <header>
        <h2>React-Router learnings</h2>
      </header>
      <main>
        <aside>
          <NavLink
            to={'/index-page'}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Index Page
          </NavLink>
          <NavLink to={'/basic'}>Basic</NavLink>
          <NavLink to={'/about'}>About</NavLink>
          <NavLink to={'/mine'}>Mine</NavLink>
          <NavLink to={'/hooks'}>Hooks</NavLink>
        </aside>
        <div
          className={`contents ${
            navigation.state === 'loading' ? 'loading' : ''
          }`}
        >
          {/* 渲染子路由 */}
          <React.Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </React.Suspense>
        </div>
      </main>
    </div>
  );
};

export default Layouts;
