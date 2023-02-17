/*
 * @Author: Lee
 * @Date: 2023-02-07 17:45:08
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-08 12:03:53
 * @Description:
 */

import React from 'react';
const Infos = (props: { loginState: boolean }) => {
  // -- 将元素存储在变量中
  const ele1 = (
    <>
      <div>👤：张三</div>
      <div>🏡：成都市高新区</div>
    </>
  );
  const ele2 = <p>Please login.</p>;
  return props.loginState ? ele1 : ele2;
};

const Tips = (props: { tips?: string }) => {
  return (
    <>
      {props.tips && <p>{props.tips}</p>}
    </>
  );
};
const ConditionalRendering: React.FC = () => (
  <>
    <Infos loginState={true} />
    <Tips tips='Hello' />
  </>
);
export default ConditionalRendering;
