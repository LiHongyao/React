/*
 * @Author: Lee
 * @Date: 2023-02-08 09:38:37
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-08 09:42:54
 * @Description:
 */
import React from 'react';

interface IProps {
  msg: string;
  onChange: (v: string) => void;
}
class Input extends React.Component<IProps> {
  // -- events
  onChange = ($event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange($event.target.value);
  };
  // -- render
  render() {
    return (
      <fieldset>
        <legend>Please enter message：</legend>
        <input type='text' value={this.props.msg} onChange={this.onChange} />
      </fieldset>
    );
  }
}

export default Input;
