/*
 * @Author: Lee
 * @Date: 2022-04-26 14:32:51
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-26 14:48:18
 */

import * as React from 'react';
import { initialState, reducer } from './store';
import AppContext from './context';
import Child from './components/Child';

export default function App() {
  // -- 解构state，dispatch
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // -- 通过上下文将 state、dispatch 分发给子组件
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className='App'>
        <Child />
      </div>
    </AppContext.Provider>
  );
}
