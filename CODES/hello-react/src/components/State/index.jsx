/*
 * @Author: Lee
 * @Date: 2022-04-18 15:45:28
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-18 15:52:56
 */

import { Component } from 'react';

class LocaleTime extends Component {
  // -- 构造函数
  constructor(props) {
    super(props);
    // init state
    this.state = {
      date: new Date(),
    };
  }
  // -- 生命周期
  componentDidMount() {
    // init timer & update state
    this.timer = setInterval(() => {
      this.setState({
        date: new Date(),
      });
    }, 1000);
  }
  componentWillUnmount() {
    // clear timer
    clearInterval(this.timer);
  }
  render() {
    return <h1>北京时间：{this.state.date.toLocaleTimeString()}</h1>;
  }
}

export default LocaleTime;
