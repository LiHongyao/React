/*
 * @Author: Lee
 * @Date: 2022-04-22 18:33:10
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-22 18:38:00
 */
import React from 'react';
export default class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.password = React.createRef();
  }
  handleSubmit() {
    let username = this.username.current.value;
    let password = this.password.current.value;
    console.log(username, password);
  }
  render() {
    return (
      <form>
        <input type='text' ref={this.username} defaultValue="admin"></input>
        <input type='password' ref={this.password} defaultValue="123456"></input>
        <button type='button' onClick={this.handleSubmit.bind(this)}>登录</button>
      </form>
    );
  }
}
