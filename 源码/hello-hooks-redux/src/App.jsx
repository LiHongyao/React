import React, { useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Control from './components/Control';
import TodoList from './components/TodoList';
import { addTodo, removeTodo, toggleTodo } from "./store/actions/todos";
import 'normalize.css/normalize.css';
import './App.css';


const App = () => {
  const todos = useSelector(state => state.todos, shallowEqual);
  const dispatch = useDispatch();

  const addTodoItem = useCallback(todo => {
    dispatch(addTodo(todo));
  }, [dispatch]);
  const removeTodoItem = useCallback(id => {
    dispatch(removeTodo(id));
  }, [dispatch]);
  const toggleTodoItem = useCallback(id => {
    dispatch(toggleTodo(id));
  }, [dispatch])

  return (
    <div className="todo-list">
      <Control addTodo={addTodoItem} />
      <TodoList todos={todos} removeTodoItem={removeTodoItem} toggleTodoItem={toggleTodoItem} />
    </div>
  );
}

export default App;


