/*
 * @Author: Lee
 * @Date: 2022-04-22 16:53:06
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-22 16:59:33
 */

import { Component } from 'react';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'please enter',
    };
  }
  // -- events
  inputChange({ target: { value } }) {
    this.setState({ value });
  }
  render() {
    return (
      <form>
        <input
          type='text'
          value={this.state.value}
          onChange={this.inputChange.bind(this)}
        />
        <p>{this.state.value}</p>
      </form>
    );
  }
}
