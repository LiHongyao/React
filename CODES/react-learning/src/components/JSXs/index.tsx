import React from 'react';

const Comps: React.FC = () => {
  // -- constants
  const user = { firstName: 'Li', lastName: 'HONGYAO' };
  const loginState = true;

  // -- methods
  const getFullName = (data: typeof user) => {
    return `${data.firstName}-${data.lastName}!`;
  };
  
  return (
    <>
      <p>Hello, React.js!</p>
      <p>Hello, {getFullName(user)}</p>
      <p>登录状态：{loginState ? '「在线」' : '已下线 」'}</p>
    </>
  );
};
export default Comps;
