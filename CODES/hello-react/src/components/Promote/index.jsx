/*
 * @Author: Lee
 * @Date: 2022-04-18 16:17:32
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-22 23:33:30
 */

import { Component } from 'react';
import Input from './Input';
export default class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }
  handleChange(message) {
    this.setState({
      message
    })
  }
  render() {
    return (
      <div style={{margin: '30px 0'}}>
        <Input message={this.state.message} handleChange={this.handleChange.bind(this)}/>
        <Input message={this.state.message} handleChange={this.handleChange.bind(this)}/>
      </div>
    );
  }
}
