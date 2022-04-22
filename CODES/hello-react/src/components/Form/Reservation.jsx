/*
 * @Author: Lee
 * @Date: 2022-04-22 18:19:55
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-22 18:21:05
 */
// test.js
import React, {Component} from 'react';

export default class Reservation extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: ''
      };
    }
  
    handleChange(event) {
        let name  = event.target.name; 
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }
  
    render() {
      return (
        <form>
            <label>账号：</label>
            <input type='text' name='username' onChange={this.handleChange.bind(this)} />

            <br />

            <label>密码：</label>
            <input type='password' name='password' onChange={this.handleChange.bind(this)} />

            <p>账号：{this.state.username} <br/> 密码：{this.state.password}</p>
        </form>
      );
    }
  }