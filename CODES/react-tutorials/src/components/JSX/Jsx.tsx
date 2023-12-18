import React from "react";

const JsxComp: React.FC = () => {
  const name = "Gregorio Y. Zara";
  const loginState = true;
  const wrapCls = "wrap";

  const getTime = () => {
    return new Date().toLocaleString();
  };

  return (
    <div className={wrapCls}>
      {/* 插值 */}
      <h1 style={{ color: "#FFA500" }}>{name}'s To Do List</h1>
      {/* 表达式 */}
      <p>status: {loginState ? "✅" : "❌"}</p>
      {/* 调用方法 */}
      <p>Time: {getTime()}</p>
    </div>
  );
};

export default JsxComp;
