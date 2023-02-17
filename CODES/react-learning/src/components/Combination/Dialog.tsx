/*
 * @Author: Lee
 * @Date: 2023-02-08 09:57:11
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-08 10:00:28
 * @Description:
 */
import React from 'react';

interface IProps {
  title: string;
  message: string;
}
class Dialog extends React.Component<IProps> {
  // -- render
  render(): React.ReactNode {
    return (
      <div className='dialog'>
        <h3>{this.props.title}</h3>
        <p>{this.props.message}</p>
      </div>
    );
  }
}
export default Dialog;
