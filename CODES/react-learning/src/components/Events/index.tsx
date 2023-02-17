/*
 * @Author: Lee
 * @Date: 2023-02-07 17:21:27
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-07 17:47:15
 * @Description:
 */
import React from 'react';

interface IProps {}
interface IState {}

class Events extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.onTapButton1 = this.onTapButton1.bind(this);
  }

  onTapButton1(event: any) {
    console.log(this, event);
  }
  onTapButton2 = () => {
    console.log(this);
  };
  onTapButton3() {
    console.log(this);
  }

  render(): React.ReactNode {
    return (
      <div>
        <button type='button' onClick={this.onTapButton1}>
          BUTTON1
        </button>
        <button type='button' onClick={this.onTapButton2}>
          BUTTON2
        </button>
        <button type='button' onClick={() => this.onTapButton3()}>
          BUTTON3
        </button>
      </div>
    );
  }
}
export default Events;
