/*
 * @Author: Lee
 * @Date: 2022-04-22 22:43:45
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-22 23:45:17
 */
import { Component } from 'react';

export default class Input extends Component {
  handleChange = (event) => {
    this.props.handleChange(event.target.value);
  };
  render() {
    return (
      <fieldset>
        <legend>Please enter message：</legend>
        <input type='text' value={this.props.message} onChange={this.handleChange.bind(this)} />
      </fieldset>
    );
  }
}
