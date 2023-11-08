import React, { ChangeEvent } from 'react';
import { AVAILABLE_COLORs } from '@/constants';
import { TodoState, todoActions } from '@/store/slices/todosSlice';
import { useAppDispatch } from '@/store/hooks';

interface IProps {
  todo: TodoState;
}
const TodoListItem: React.FC<IProps> = React.memo(({ todo }) => {
  // -- dispatch
  const dispatch = useAppDispatch();
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
          className={`toggle ${todo.completed ? 'checked' : ''}`}
          onClick={handleCompletedChanged}
        />
        <div className='todo-text'>{todo.text}</div>
      </div>
      <div className='segment buttons'>
        <select
          className='colorPicker'
          value={todo.color}
          style={{ color: todo.color }}
          onChange={handleColorChanged}
        >
          <option value=''>MARKS</option>
          {colorOptions}
        </select>
        <button className='destroy' onClick={onDelete}>
          x
        </button>
      </div>
    </li>
  );
});

export default TodoListItem;
