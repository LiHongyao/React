/*
 * @Author: Lee
 * @Date: 2023-02-10 09:22:10
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-10 10:17:26
 * @Description:
 */


// -- 定义一个生成「Action」类型的泛型
type ActionMap<M extends Record<string, any>> = {
  [K in keyof M]: M[K] extends undefined
    ? { type: K }
    : { type: K; payload: M[K] };
};

// -- 定义具体的Action类型
type PayloadType = {
  CHANGE_NAME: string;
  CHANGE_AGE: number;
};

export type ActionType = ActionMap<PayloadType>[keyof ActionMap<PayloadType>];
export type StateType = {
  name: string;
  age: number;
};

export const initialState: StateType = { name: '李四', age: 30 };
export const reducer: React.Reducer<StateType, ActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return { ...state, name: action.payload };
    case 'CHANGE_AGE':
      return { ...state, age: action.payload };
    default:
      return state;
  }
};
