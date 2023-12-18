// -- 引入相关依赖
import React from "react";
import ReactDOM from "react-dom/client";
// -- 引入根组件
import App from "@/App.tsx";

// -- 创建并渲染根节点
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
