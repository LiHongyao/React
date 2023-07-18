// -- 引入相关依赖
import React from 'react';
import ReactDOM from 'react-dom/client';
// -- 引入全局样式
import './index.css';
// -- 引入根组件
import App from './App';

// -- 创建根节点
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// -- 渲染根节点
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
