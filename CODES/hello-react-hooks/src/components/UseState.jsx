/*
 * @Author: Lee
 * @Date: 2022-04-25 15:45:49
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-25 16:26:39
 */

import { useState, useEffect } from 'react';

export default function App() {
  // -- state
  const [count, setCount] = useState(0);
  // -- effects
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  useEffect(() => {
    // -- 副作用操作
    return () => {
      // -- 清除副作用
    };
  });
  // -- render
  return (
    <div>
      <p>You Click the Button {count} times.</p>
      <button
        type='button'
        onClick={() => setCount((prevCount) => prevCount + 1)}
      >
        Tap me.
      </button>
    </div>
  );
}
