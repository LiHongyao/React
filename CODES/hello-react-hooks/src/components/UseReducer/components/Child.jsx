/*
 * @Author: Lee
 * @Date: 2022-04-26 14:46:51
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-26 14:56:58
 */

import * as React from 'react';
import AppContext from '../context';
export default function Child() {
  // -- reducers
  const { state, dispatch } = React.useContext(AppContext);
  // -- render
  return (
    <div className='child'>
      {/* 读取状态 */}
      <p>count：{state.count}</p>
      <p>message：{state.message}</p>
      {/* 出发action更新数据 */}
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
      <input
        onInput={({ target: { value } }) => {
          dispatch({ type: 'UPDATE_MESSAGE', payload: value });
        }}
      />
    </div>
  );
}
