/*
 * @Author: Lee
 * @Date: 2023-02-10 10:11:01
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-10 11:33:26
 * @Description:
 */
import React, { useContext, useRef } from 'react';
import { AppContext } from 'src/context_for_reducer';

const Test: React.FC = () => {
  // -- refs
  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  // -- reducers
  const { state, dispatch } = useContext(AppContext);
  // -- events
  const onChangeName = () => {
    dispatch({ type: 'CHANGE_NAME', payload: nameInput.current?.value || '' });
  };
  const onChangeAge = () => {
    dispatch({type: 'CHANGE_AGE', payload: ageInput.current ? parseInt(ageInput.current.value) : 0});
  };
  // -- renders
  return (
    <div className='Test'>
      <div>{state.name} - {state.age}</div>

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
