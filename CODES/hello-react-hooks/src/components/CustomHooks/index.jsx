/*
 * @Author: Lee
 * @Date: 2022-04-26 17:01:50
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-26 17:09:57
 */

import * as React from 'react';
import useList from './hooks/useList';

export default function App() {
  // -- hooks
  const { list } = useList();

  return (
    <div className='App'>
      {list ? (
        <ul>
          {list.map((item) => (
            <li key={item.id}>
              {item.name} - {item.job}
            </li>
          ))}
        </ul>
      ) : (
        'loading...'
      )}
    </div>
  );
}
