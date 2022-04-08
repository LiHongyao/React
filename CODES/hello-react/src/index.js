// -- 引入核心依赖
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// -- 引入全局样式
import './index.css';

// -- 引入根组件
import App from './App';

// -- 渲染根视图
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
