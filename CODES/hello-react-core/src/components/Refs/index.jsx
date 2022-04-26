/*
 * @Author: Lee
 * @Date: 2022-04-26 12:44:49
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-26 13:48:17
 */
import { Component, createRef } from 'react';
import Child from './Child';
export default class Example extends Component {
  constructor(props) {
    super(props);
    // -- 创建refs
    this.vRef = createRef();
  }
  componentDidMount() {
    // -- 访问refs
    const node = this.vRef.current;
    console.log(node);
  }
  render() {
    // -- 分发refs
    return <Child ref={this.vRef}>Hello, Refs!</Child>;
  }
}
