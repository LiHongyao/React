/*
 * @Author: Lee
 * @Date: 2023-02-07 11:08:09
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-07 11:39:48
 * @Description:
 */

import React from 'react';

interface IProps {
  name: string;
  job: string;
  onClick: (msg: string) => void;
}

const Child: React.FC<IProps> = (props) => {
  // -- render
  return (
    <div>
      {/* 接收父组件传递过来的属性 */}
      <p>{props.name} - {props.job}</p>
      {/* 发送消息给父组件 */}
      <button
        type='button'
        onClick={() => {
          props.onClick('Hello, Father!');
        }}
      >
        Send msg to Father
      </button>
    </div>
  );
};

export default Child;

/*class Child extends React.Component<IProps> {
  render() {
    return (
      <div>
        {this.props.name} - {this.props.job}
      </div>
    );
  }
}*/
