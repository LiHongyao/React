/*
 * @Author: Lee
 * @Date: 2022-04-11 15:33:41
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-11 17:08:47
 */
import Welcome from '../Welcome';
import Child from './Child';
import List from './List';
const Basic = () => {
  // -- constants
  const name = 'Li-HONGYAO';
  const isLogin = true;

  // -- methods
  const renderTips = (name) => {
    if (name) {
      return <p>Hello, {name}！</p>;
    }
    return <p>Hello, Girls！</p>;
  };
  // const element = (
  //   <div>
  //     <p className='name'>Name：Li-HONGYAO</p>
  //     <p className='tel'>Phone：17398888669</p>
  //   </div>
  // );
  return (
    <div className='basic'>
      <p>Hello, React.js!</p>
      {/* JSX-表达式 */}
      {name} - {isLogin ? '已登录' : '未登录'}
      {renderTips(name)}
      {/* 组件复用 */}
      <Welcome name='Sara' />
      <Welcome name='Jack' />
      {/* 父传子 */}
      <Child
        name='Li-HONGYAO'
        job='Web Front-end Engineer'
        tap={(args) => {
          console.log('接收到子组件传递的数据：', args);
        }}
      />
      {/* 插槽 */}
      <List>
        <p>姜子牙</p>
        <p>哪吒</p>
      </List>
    </div>
  );
};

export default Basic;
