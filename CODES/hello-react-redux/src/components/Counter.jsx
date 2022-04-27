/*
 * @Author: Lee
 * @Date: 2022-04-27 09:30:12
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-27 10:16:50
 */

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../store/actions';

export default function Counter(props) {
  // -- dispatch
  const dispatch = useDispatch();
  // -- 读取store
  const data = useSelector((state) => ({
    number: state.number,
    message: state.message,
  }));

  return (
    <div className='counter'>
      <p>{data.message}</p>
      <button onClick={() => dispatch(increment(1))}>+</button>
      <span>{data.number}</span>
      <button onClick={() => dispatch(decrement(1))}>-</button>
    </div>
  );
}

/*
import * as React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../store/actions';
// -- 展示组件
const Counter = (props) => {
  return (
    <div className='counter'>
      <p>{props.message}</p>
      <button onClick={() => props.increment(1)}>+</button>
      <span>{props.number}</span>
      <button onClick={() => props.decrement(1)}>+</button>
    </div>
  );
};

// -- 容器组件
export default connect(
  // mapStateToProps
  (state) => ({
    message: state.message,
    number: state.number,
  }),
  // mapDispatchToProps
  (dispatch) => ({
    increment: (n) => dispatch(increment(n)),
    decrement: (n) => dispatch(decrement(n)),
  })
)(Counter);*/
