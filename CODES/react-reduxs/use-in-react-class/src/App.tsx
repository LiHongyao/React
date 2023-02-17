/*
 * @Author: Lee
 * @Date: 2023-02-16 18:03:27
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-16 18:21:14
 * @Description: 
 */
import React from 'react';
import Counter from './components/Counter';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div className='app'>
        <Counter />
      </div>
    );
  }
}

export default App;
