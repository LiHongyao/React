import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import TodoListItem from '@/components/todos/TodoListItem';

const TodoList: React.FC = () => {
  // -- selectors
  const todoIds = useSelector((state: RootState) =>
    state.todos.map((todo) => todo.id)
  );
  // -- renders
  const renderedListItems = todoIds.map((todoId) => (
    <TodoListItem key={todoId} id={todoId} />
  ));
  return <ul className='todo-list'>{renderedListItems}</ul>;
};

export default TodoList;
