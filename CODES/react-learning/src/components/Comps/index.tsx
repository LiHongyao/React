import React from 'react';
import Welcome from './Welcome';
import Child from './Child';
import List from './List';
const Comps: React.FC = () => {
  return (
    <>
      <Welcome name='张三' />
      <Welcome name='张三' />
    {/* 通过属性Props传递数据 */}
    <Child
      name='李鸿耀'
      job='程序猿'
      onClick={(msg) => {
        console.log(msg);
      }}
    />
      {/* 插槽 */}
      <List>
        <p>语文</p>
        <p>数学</p>
        <p>英语</p>
      </List>
    </>
  );
};

export default Comps;
