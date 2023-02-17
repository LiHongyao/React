/*
 * @Author: Lee
 * @Date: 2023-02-08 09:34:11
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-08 09:43:14
 * @Description:
 */
import React from 'react';
import Input from './Input';

interface IProps {}
interface IState {
  msg: string;
}
class Controller extends React.Component<IProps, IState> {
  // -- constructor
  constructor(props: IProps) {
    super(props);
    this.state = { msg: '' };
  }
  // -- events
  onChange = (v: string) => {
    this.setState({ msg: v });
  };
  // -- render
  render(): React.ReactNode {
    return (
      <>
        <Input msg={this.state.msg} onChange={this.onChange} />
        <Input msg={this.state.msg} onChange={this.onChange} />
      </>
    );
  }
}

export default Controller;
