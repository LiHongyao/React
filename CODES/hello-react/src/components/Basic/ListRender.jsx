/*
 * @Author: Lee
 * @Date: 2022-04-18 17:08:56
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-18 17:15:41
 */

import { Component } from 'react';

class List extends Component {
  render() {
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) => (
      <li key={number.toString()}>{number}</li>
    ));
    return <ul>{listItems}</ul>;
  }
}

export default List;
