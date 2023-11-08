import React from 'react';
import TodoListItem from './TodoListItem';
import { FiltersStatus } from '@/store/slices/filtersSlice';
import { useAppSelector } from '@/store/hooks';

const TodoList: React.FC = React.memo(() => {
  // -- selectors
  const todos = useAppSelector((state) => state.todos);
  const filters = useAppSelector((state) => state.filters);

  // -- renders
  const renderedListItems = () => {
    const filterTodos = todos.filter((todo) => {
      const condition1 =
        filters.colors.length === 0
          ? true
          : filters.colors.includes(todo.color || '');
      const condition2 = (() => {
        if (filters.status === FiltersStatus.Active) {
          return !todo.completed;
        }
        if (filters.status === FiltersStatus.Completed) {
          return todo.completed;
        }
        return true;
      })();
      return condition1 && condition2;
    });
    return filterTodos.map((todo) => (
      <TodoListItem key={todo.id} todo={todo} />
    ));
  };
  return <ul className='todo-list'>{renderedListItems()}</ul>;
});

export default TodoList;
