/*
 * @Author: Lee
 * @Date: 2022-04-25 17:17:50
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-25 17:30:24
 */

import { Component } from 'react';
import { AppContext } from './context';
export default class Child extends Component {
  render() {
    const { count, increment } = this.context;
    return (
      <div>
        <button onClick={increment}>Click {count} times!</button>
      </div>
    );
  }
}
// -- 订阅上下文
Child.contextType = AppContext;
