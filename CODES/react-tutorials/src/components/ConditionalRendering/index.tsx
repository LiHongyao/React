import React from "react";

const ConditionalRendering: React.FC = () => {
  const loginState = true;
  return loginState ? (
    <>
      <div>👤：张三</div>
      <div>🏡：成都市高新区</div>
    </>
  ) : (
    <p>Please login.</p>
  );
};

export default ConditionalRendering;
