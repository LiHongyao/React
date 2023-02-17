/*
 * @Author: Lee
 * @Date: 2023-02-16 18:06:26
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-16 20:54:01
 * @Description:
 */

import { ActionCreator } from 'redux';
import { AppDispatch, RootState } from '..';
import { statusToggle } from './statusReducer';

// -- Define Actions
// 👉 用常量定义Action.type，减少代码敲错
const COUNTER_INCREMENT = 'counter/increment';
const COUNTER_DECREMENT = 'counter/decrement';
const COUNTER_INCREMENT_BY_AMOUNT = 'counter/incrementByAmount';

// 👉 Action 类型声明
type CounterIncrementAction = { type: typeof COUNTER_INCREMENT };
type CounterDecrementAction = { type: typeof COUNTER_DECREMENT };
type CounterIncrementByAmountAction = { type: typeof COUNTER_INCREMENT_BY_AMOUNT; payload: number };
type CounterAction = CounterIncrementAction | CounterDecrementAction | CounterIncrementByAmountAction;

// 👉 工厂模式 → 创建 Action
export const increment: ActionCreator<CounterIncrementAction> = () => ({
  type: COUNTER_INCREMENT,
});
export const decrement: ActionCreator<CounterDecrementAction> = () => ({
  type: COUNTER_DECREMENT,
});
export const incrementByAmount: ActionCreator<CounterIncrementByAmountAction> = (amount: number) => ({
  type: COUNTER_INCREMENT_BY_AMOUNT,
  payload: amount,
});

// 👉 initialState
interface CounterState {
  count: number;
}
const initialState: CounterState = { count: 0 };

// 👉 Define Reducer
const counterReducer = (
  state = initialState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case COUNTER_INCREMENT:
      return { ...state, count: state.count + 1 };
    case COUNTER_DECREMENT:
      return { ...state, count: state.count - 1 };
    case COUNTER_INCREMENT_BY_AMOUNT:
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
};

// 👉 CHUNKs - 异步函数
export const incrementAsync = (amount: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const isLoading = getState().status.loading;
    if (isLoading) {
      console.log('当前正在执行异步操作，请稍后再试...');
      return;
    }
    dispatch(statusToggle());
    await new Promise((resolve) => {
      console.log('Loading...');
      setTimeout(() => {
        resolve(null);
      }, 1000);
    });
    dispatch(statusToggle());
    dispatch(incrementByAmount(amount));
    console.log('Completed!');
  };
};

export default counterReducer;
