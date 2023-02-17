/*
 * @Author: Lee
 * @Date: 2023-02-09 17:52:25
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-09 19:56:18
 * @Description:
 */
import React, { useState } from 'react';

const HelloHooks: React.FC = () => {
  // -- state
  const [times, setTimes] = useState(0);
  const [name, setName] = useState('');
  const [todos, setTodos] = useState([{ text: 'learns' }]);
  // -- renders
  return (
    <div className='page'>
      <p>You Click the Button {times} times.</p>
      <button type='button' onClick={() => setTimes(times + 1)}>
        Tap me.
      </button>
    </div>
  );
};

export default HelloHooks;
