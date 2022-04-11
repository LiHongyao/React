/*
 * @Author: Lee
 * @Date: 2022-04-08 16:36:33
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-11 15:32:37
 */
// -- 引入核心依赖
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// -- 引入全局样式
import './index.css';

// -- 引入根组件
import App from './App';

// -- 渲染根视图
const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// -- 元素渲染演示
// const root = createRoot(document.getElementById('root'));
// function tick() {
//   const element = (
//     <div>
//       <h2>北京时间：{new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   root.render(element);
// }
// setInterval(tick, 1000);
