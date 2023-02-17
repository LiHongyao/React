/*
 * @Author: Lee
 * @Date: 2023-02-11 14:51:20
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-14 17:47:13
 * @Description:
 */
import React from 'react';
import Header from './components/header/Header';
import TodoList from './components/todos/TodoList';
import Footer from './components/footer/Footer';
import './index.less';
const App: React.FC = () => {
  return (
    <div className='app'>
      <nav className='nav-bar'>
        <h1>Li-HONGYAO'S TODOs</h1>
      </nav>
      <main className='contents'>
        <div className='loader'></div>
        <div className='todoapp'>
          <Header />
          <TodoList />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default App;
