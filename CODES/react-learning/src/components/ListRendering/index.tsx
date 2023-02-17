/*
 * @Author: Lee
 * @Date: 2023-02-07 18:57:08
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-07 19:02:25
 * @Description:
 */
import React from 'react';

interface IProps {}
interface IState {}
class ListRendering extends React.Component<IProps, IState> {
  render(): React.ReactNode {
    const nums = [1, 2, 3, 4, 5];
    const listItems = nums.map((item, index) => <li key={index}>{item}</li>);
    return <ul>{listItems}</ul>;
  }
}

export default ListRendering;
