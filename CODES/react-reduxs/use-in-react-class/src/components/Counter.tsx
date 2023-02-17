/*
 * @Author: Lee
 * @Date: 2023-02-16 18:05:01
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-16 20:57:33
 * @Description:
 */
import React, { ChangeEvent, Dispatch } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../stores';
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
} from '../stores/reducers/counterReducer';
import './Counter.css';

// → 处理数据的流入，返回一个对象
// → 使用 connect 函数，传入 mapStateToProps，完成store数据与组件的props绑定
const mapStateToProps = (state: RootState) => ({
  count: state.counter.count,
  loading: state.status.loading,
});

// → 处理数据的流出，返回一个对象，对象中的每一个字段都是一个dispatch处理函数
// → 使用 connect 函数，传入 mapDispatchToProps，完成dispatch与组件的props绑定
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
  incrementByAmount: (amount: number) => dispatch(incrementByAmount(amount)),
  incrementAsync: (amount: number) => dispatch(incrementAsync(amount)),
});

// -- 类型声明
type IProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
type IState = { incrementAmount: string };
class Counter extends React.Component<IProps, IState> {
  // -- constructor
  constructor(props: IProps) {
    super(props);
    this.state = {
      incrementAmount: '5',
    };
  }
  // -- methods
  getAmount = () => Number(this.state.incrementAmount) || 0;
  // -- events
  onIncrement = () => this.props.increment();
  onDecrement = () => this.props.decrement();
  onAddAmount = () => this.props.incrementByAmount(this.getAmount());
  onAddAsync = () => this.props.incrementAsync(this.getAmount());
  onInputChange = ($event: ChangeEvent<HTMLInputElement>) =>
    this.setState({
      incrementAmount: $event.target.value,
    });
  // -- renders
  render(): React.ReactNode {
    return (
      <div className='counter'>
        <div className='row'>
          <button className='button' onClick={this.onIncrement}>+</button>
          <span className='value'>{this.props.count}</span>
          <button className='button' onClick={this.onDecrement}>-</button>
        </div>
        <div className='row'>
          <input
            className='textbox'
            value={this.state.incrementAmount}
            onChange={this.onInputChange}
          />
          <button className='button' onClick={this.onAddAmount}>Add Amount</button>
          <button className='button asyncButton' onClick={this.onAddAsync}>Add Async</button>
        </div>
      </div>
    );
  }
}

// → 生成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
