/*
 * @Author: Lee
 * @Date: 2023-02-09 21:08:37
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-10 09:41:50
 * @Description:
 */
import React, { useReducer, useRef } from 'react';

// -- 定义一个生成Action类型的泛型
type ActionMap<M extends Record<string, any>> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

// -- 定义具体的Action类型
type PayloadType = {
  CHANGE_NAME: string;
  CHANGE_AGE: number;
};
type ActionType = ActionMap<PayloadType>[keyof ActionMap<PayloadType>];

type StateType = {
  name: string;
  age: number;
};

const initialState: StateType = { name: '张三', age: 18 };
const reducer: React.Reducer<StateType, ActionType> = (state, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return { ...state, name: action.payload };
    case 'CHANGE_AGE':
      return { ...state, age: action.payload };
    default:
      return state;
  }
};

const Test: React.FC = () => {
  // -- refs
  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  // -- reducers
  const [state, dispatch] = useReducer(reducer, initialState);
  // -- events
  const onChangeName = () => {
    dispatch({ type: 'CHANGE_NAME', payload: nameInput.current?.value || '' });
  };
  const onChangeAge = () => {
    dispatch({
      type: 'CHANGE_AGE',
      payload: ageInput.current ? parseInt(ageInput.current.value) : 0,
    });
  };
  // -- renders
  return (
    <div className='Test'>
      <div>
        {state.name} - {state.age}{' '}
      </div>

      <input ref={nameInput} />
      <button type='button' onClick={onChangeName}>
        修改姓名
      </button>
      <br />

      <input ref={ageInput} />
      <button type='button' onClick={onChangeAge}>
        修改年龄
      </button>
    </div>
  );
};
export default Test;
