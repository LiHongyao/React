/*
 * @Author: Lee
 * @Date: 2023-02-11 14:51:20
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-14 17:32:59
 * @Description:
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '@/App';
import store from '@/store';
import { fetchTodos } from '@/store/slices/todosSlice';

/**
 * 首次加载程序，添加默认数据
 */
if (!localStorage.getItem('REDUX_TODOs')) {
  localStorage.setItem(
    'REDUX_TODOs',
    JSON.stringify([
      { id: 0, text: 'Learn React', completed: true },
      { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
      {
        id: 2,
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



