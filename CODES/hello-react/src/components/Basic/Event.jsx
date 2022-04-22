/* eslint-disable no-unreachable */
/*
 * @Author: Lee
 * @Date: 2022-04-18 16:46:53
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-18 16:50:34
 */

import { Component } from 'react';

class Event extends Component {
  // -- events
  onButtonTap = (e) => {
    console.log();
  };
  render() {
    return (
      <button type='button' onClick={this.onButtonTap}>
        Tap me .
      </button>
    );
  }
}
export default Event;
