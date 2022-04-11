/*
 * @Author: Lee
 * @Date: 2022-04-11 16:19:47
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-11 16:19:48
 */
import { Component, Children } from 'react';
class List extends Component {
  render() {
    return (
      <ul className='list'>
        {
          /* 列表项数量以及内容不确定，在创建模板时才能确定
             利用this.props.children从父组件获取需要展示的列表项内容
             获取到列表项内容后，需要遍历children，逐项进行设置
             使用React.Children.map() 方法
             返回值：数组对象，这里数组中的元素是<li> */
          Children.map(this.props.children, (child) => {
            return <li>{child}</li>;
          })
        }
      </ul>
    );
  }
}
export default List;
