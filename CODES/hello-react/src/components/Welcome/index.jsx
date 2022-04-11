/*
 * @Author: Lee
 * @Date: 2022-04-11 15:40:14
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-11 16:00:32
 */

// -- 引入外部样式
import './index.css';

const Welcome = (props) => {
  const styleObj = { color: 'blue', letterSpacing: '2px' };
  return (
    <div>
      {/* 内联样式 */}
      <p style={{ color: 'red', letterSpacing: '2px' }}>Hello, {props.name}</p>
      {/* 对象样式 */}
      <p style={styleObj}>Hello, {props.name}</p>
      {/* 外部样式 */}
      <p className='welcome'>Hello, {props.name}</p>
    </div>
  );
};
export default Welcome;
