/*
 * @Author: Lee
 * @Date: 2023-02-11 23:27:16
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-12 14:47:12
 * @Description:
 */

import React, { ChangeEvent } from 'react';
import { AVAILABLE_COLORs } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { TodoState, todoActions } from '@/store/slices/todosSlice';

const TodoListItem: React.FC<{ id: number }> = ({ id }) => {
  // -- selectors
  const todo = useSelector<RootState, TodoState | undefined>((state) =>
    state.todos.find((todo) => todo.id === id)
  );
  if (!todo) return null;
  const { text, completed, color } = todo;
  // -- dispatch
  const dispatch = useDispatch();
  // -- events
  const handleCompletedChanged = () => {
    dispatch(todoActions.todoToggled(todo.id));
  };
  const handleColorChanged = ($event: ChangeEvent<HTMLSelectElement>) => {
    const color = $event.target.value;
    dispatch(
      todoActions.colorSelected({
        todoId: todo.id,
        color,
      })
    );
  };
  const onDelete = () => {
    dispatch(todoActions.todoDeleted(todo.id));
  };

  // -- renders
  const colorOptions = AVAILABLE_COLORs.map((c) => (
    <option key={c} value={c}>
      {c[0].toUpperCase() + c.slice(1)}
    </option>
  ));
  return (
    <li>
      <div className='segment label'>
        <div
          className={`toggle ${completed ? 'checked' : ''}`}
          onClick={handleCompletedChanged}
        />
        <div className='todo-text'>{text}</div>
      </div>
      <div className='segment buttons'>
        <select
          className='colorPicker'
          value={color}
          style={{ color }}
          onChange={handleColorChanged}
        >
          <option value=''>——</option>
          {colorOptions}
        </select>
        <button className='destroy' onClick={onDelete}>
          X
        </button>
      </div>
    </li>
  );
};

export default TodoListItem;
