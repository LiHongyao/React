/*
 * @Author: Lee
 * @Date: 2023-02-07 10:46:08
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-07 11:01:52
 * @Description:
 */
import React from 'react';
import './index.css'; /** 引入外部样式 */

interface IProps {
  name: string;
}

const Welcome: React.FC<IProps> = (props) => {
  const styles = { color: 'blue', letterSpacing: '2px' };
  return (
    <div>
      {/* 内联样式 */}
      <p style={{ color: 'red', letterSpacing: '2px' }}>Hello, {props.name}</p>
      {/* 对象样式 */}
      <p style={styles}>Hello, {props.name}</p>
      {/* 外部样式 */}
      <p className='welcome'>Hello, {props.name}</p>
    </div>
  );
};
export default Welcome;


