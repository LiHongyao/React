import React from 'react';
import Header from '@/components/Header';
import TodoList from '@/components/TodoList';
import Footer from '@/components/Footer';
import './index.less';
const App: React.FC = () => {
  return (
    <div className='app'>
      <nav className='nav-bar'>
        <h1>TODOs</h1>
      </nav>
      <main className='contents'>
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
