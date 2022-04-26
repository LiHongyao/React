/*
 * @Author: Lee
 * @Date: 2022-04-26 14:41:07
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-26 14:43:40
 */

// -- initialState
export const initialState = {
  message: '众志成城，抗疫救灾',
  count: 0,
};

// -- reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'UPDATE_MESSAGE':
      return { ...state, message: action.payload };
    default:
  }
};
