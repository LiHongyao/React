/*
 * @Author: Lee
 * @Date: 2022-04-22 17:06:08
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-22 17:07:29
 */
import { Component } from 'react';

export default class Textarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '请用一句话介绍自己...',
    };
  }
  handleChange({ target: { value } }) {
    this.setState({ value });
  }
  handleSubmit(event) {
    alert(this.state.value);
  }
  render() {
    return (
      <form name='myForm' onSubmit={this.handleSubmit.bind(this)}>
        <textarea
          type='text'
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
        <p>
          <button type='submit'>确定</button>
        </p>
      </form>
    );
  }
}
