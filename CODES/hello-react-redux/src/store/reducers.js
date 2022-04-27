/*
 * @Author: Lee
 * @Date: 2022-04-27 09:45:44
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-27 09:46:53
 */
import { INCREMENT, DECREMENT } from './action-types';

const initialState = {
  number: 0,
  message: '众志成城，抗疫救灾',
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        number: state.number + action.number,
      };
    case DECREMENT:
      return {
        ...state,
        number: state.number - action.number,
      };
    default: {
      return state;
    }
  }
};
export default reducers;

