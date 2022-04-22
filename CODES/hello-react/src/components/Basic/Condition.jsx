/*
 * @Author: Lee
 * @Date: 2022-04-18 16:57:27
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-18 17:05:55
 */

import React from 'react';

// -- 显示用户信息
const UserInfo = (props) => {
  const el1 = <div>Li-HONGYAO / 17398888669</div>;
  const el2 = <div>Please go to login.</div>;
  return props.login ? el1 : el2;
};

// -- 示例组件
export default function Condition() {
  return <UserInfo login={false} />;
}