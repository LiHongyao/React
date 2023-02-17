/*
 * @Author: Lee
 * @Date: 2023-02-07 11:16:01
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-07 11:30:19
 * @Description:
 */
import React from 'react';

interface IProps {
  children: JSX.Element | Array<JSX.Element>;
}

const List: React.FC<IProps> = (props) => {
  return <div>{props.children}</div>;
};

/*
interface IProps {
  children: React.ReactNode;
}

class List extends React.Component<IProps> {
  render() {
    return <div>{this.props.children}</div>;
  }
}*/

export default List;
