/*
 * @Author: Lee
 * @Date: 2022-04-24 11:11:43
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-24 11:23:38
 */
import { Component } from 'react';

export default class Dialog extends Component {
  render() {
    return (
      <div className='dialog'>
        <h1 className='dialog-title'>{this.props.title}</h1>
        <p className='dialog-message'>{this.props.message}</p>
      </div>
    );
  }
}
