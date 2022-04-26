/*
 * @Author: Lee
 * @Date: 2022-04-26 16:21:54
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-26 16:34:21
 */

import * as React from 'react';

const Child = React.forwardRef((props, ref) => {
  // -- refs
  const [value, setValue] = React.useState('');
  // -- 暴露方法或属性给父组件
  React.useImperativeHandle(
    ref,
    () => ({
      value,
      message: 'props in child.',
      sayHello: () => console.log('method in child.'),
    }),
    [value]
  );
  return (
    <div className='child'>
      <input onInput={({ target: { value } }) => setValue(value)} />
    </div>
  );
});

export default function App() {
  // -- refs
  const childRef = React.useRef(null);
  // -- events
  const handleClick = () => {
    // get props
    console.log(childRef.current.value);
    console.log(childRef.current.message);
    // get methods
    childRef.current.sayHello();
  };
  // -- render
  return (
    <div className='App'>
      <Child ref={childRef} />
      <button onClick={handleClick}>Reading</button>
    </div>
  );
}
