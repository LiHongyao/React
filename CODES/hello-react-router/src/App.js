/*
 * @Author: Lee
 * @Date: 2022-04-24 17:10:13
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-24 18:08:22
 */
import { useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

const App = () => {


  return (
    <div>
      <header>
        <h1>Welcome to React Router!</h1>
      </header>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
};
export default App;
