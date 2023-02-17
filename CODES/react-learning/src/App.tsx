/*
 * @Author: Lee
 * @Date: 2023-02-07 09:40:12
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-10 10:08:10
 * @Description:
 */

import React, { useReducer } from 'react';
import { initialState, reducer } from 'src/store';
import { AppContext } from './context_for_reducer';
const App: React.FC = () => {
  // -- 解构state，dispatch
  const [state, dispatch] = useReducer(reducer, initialState);
  // -- 通过上下文将 state、dispatch 分发给子组件
  return (
    <AppContext.Provider value={{ state, dispatch }}></AppContext.Provider>
  );
};

export default App;
