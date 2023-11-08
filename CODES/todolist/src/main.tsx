import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '@/App';
import store from '@/store';
import { fetchTodos } from '@/store/slices/todosSlice';

/**
 * 首次加载程序，添加默认数据
 */
const generateID = () => {
  return Math.random().toString(32).slice(2);
};
if (!localStorage.getItem('REDUX_TODOs')) {
  localStorage.setItem(
    'REDUX_TODOs',
    JSON.stringify([
      {
        id: generateID(),
        text: 'Learn React',
        completed: true,
      },
      {
        id: generateID(),
        text: 'Learn Redux',
        completed: false,
        color: 'purple',
      },
      {
        id: generateID(),
        text: 'Build something fun!',
        completed: false,
        color: 'blue',
      },
    ])
  );
}

store.dispatch(fetchTodos);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // 使用 <Provider> 组件包裹 <App> 组件
  // 并把 Redux store 作为 prop 传入
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
