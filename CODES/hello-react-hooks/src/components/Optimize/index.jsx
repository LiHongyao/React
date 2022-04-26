/*
 * @Author: Lee
 * @Date: 2022-04-26 15:28:14
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-26 15:53:29
 */

import * as React from 'react';

// -- 子组件
const Child = React.memo((props) => {
  // 使用memo包裹优化
  console.log('child-props', props);
  return (
    <div>
      <input type='text' onChange={props.onChange} />
    </div>
  );
});

// -- 父组件
const Parent = () => {
  // -- state
  const [text, setText] = React.useState('');

  // -- events
  /*
  const hanleChange = ({ target: { value } }) => {
    setText(value);
  };*/
  // 优化写法
  const hanleChange = React.useCallback(({ target: { value } }) => {
    setText(value);
  }, []);

  // -- render
  return (
    <div>
      <p>text: {text}</p>
      <Child onChange={hanleChange} />
    </div>
  );
};

export default Parent;
