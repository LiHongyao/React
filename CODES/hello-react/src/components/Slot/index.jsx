/*
 * @Author: Lee
 * @Date: 2022-04-24 11:09:30
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-24 12:38:33
 */

import { Component } from 'react';
import Dialog from './Dialog';

export default class Slot extends Component {
  render() {
    return <Dialog title='温馨提示' message='测试组合功能' />;
  }
}
