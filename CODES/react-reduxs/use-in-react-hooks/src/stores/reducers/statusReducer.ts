/*
 * @Author: Lee
 * @Date: 2023-02-16 21:07:57
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-16 21:08:09
 * @Description: 
 */
import { ActionCreator } from 'redux';

// -- Define Actions
// 1. 用常量定义Action.type，减少代码敲错
const STATUS_TOGGLE = 'status/toggle';

// 2. Action 类型声明
type StatusAction = { type: typeof STATUS_TOGGLE };

// 3. 工厂模式 → 创建 Action
export const statusToggle: ActionCreator<StatusAction> = () => ({
  type: STATUS_TOGGLE,
});

// -- initialState
interface StatusState {
  loading: boolean;
}
const initialState: StatusState = {
  loading: false,
};

// -- Define Reducer
const statusReducer = (
  state = initialState,
  action: StatusAction
): StatusState => {
  switch (action.type) {
    case STATUS_TOGGLE:
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
};

export default statusReducer;