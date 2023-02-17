/*
 * @Author: Lee
 * @Date: 2023-02-11 23:39:43
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-14 22:04:13
 * @Description:
 */

import { saveNewTodo } from '@/store/slices/todosSlice';
import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';

const Header: React.FC = () => {
  // -- state
  const [text, setText] = useState('');

  // -- dispatch
  const dispatch = useDispatch();

  // -- events
  const onChange = ($event: ChangeEvent<HTMLInputElement>) => {
    setText($event.target.value);
  };
  const onKeyDown = ($event: KeyboardEvent<HTMLInputElement>) => {
    const trimmedText = $event.currentTarget.value.trim();
    if ($event.code === 'Enter' && trimmedText) {
      // @ts-ignore
      dispatch(saveNewTodo(trimmedText));
      setText('');
    }
  };

  // -- renders
  return (
    <header className='header'>
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        value={text}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </header>
  );
};

export default Header;
