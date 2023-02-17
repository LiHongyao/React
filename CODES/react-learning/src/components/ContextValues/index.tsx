/*
 * @Author: Lee
 * @Date: 2023-02-09 14:45:37
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-09 20:47:49
 * @Description:
 */

import React from 'react';
import { AppContext } from 'src/context';

interface IProps {}
interface IState {}

class ContextValues extends React.Component<IProps, IState> {
  // -- 订阅上下文
  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;
  // -- 渲染函数
  render(): React.ReactNode {
    return (
      <>
        {/* <p>Times:{this.context?.count}</p> */}
        {/* @ts-ignore */}
        <button type='button' onClick={this.context?.increment}>
          Tap
        </button>
        <div>
          {this.context?.name} - {this.context?.job}
        </div>
      </>
    );
  }
}

export default ContextValues;
