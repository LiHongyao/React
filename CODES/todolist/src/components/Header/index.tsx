import React, { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { todoActions } from '@/store/slices/todosSlice';
import { useAppDispatch } from '@/store/hooks';

const Header: React.FC = React.memo(() => {
  // -- state
  const [text, setText] = useState('');

  // -- dispatch
  const dispatch = useAppDispatch();

  // -- events
  const onChange = ($event: ChangeEvent<HTMLInputElement>) => {
    setText($event.target.value);
  };
  const onKeyDown = ($event: KeyboardEvent<HTMLInputElement>) => {
    const trimmedText = $event.currentTarget.value.trim();
    if ($event.code === 'Enter' && trimmedText) {
      dispatch(todoActions.todoAdded(trimmedText));
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
});

export default Header;
