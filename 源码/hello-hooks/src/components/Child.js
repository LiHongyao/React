import React, { useContext } from 'react';
import AppContext from '../context';

const Child = () => {
    const { state, dispatch } = useContext(AppContext);
    return (
        <div className='Child'>
            {/* 读取状态 */}
            <p>count: {state.count}</p>
            <p>message: {state.message}</p>
            {/* 触发action更新数据 */}
            <button onClick={() => { dispatch({ type: 'increment' }) }}>加</button>
            <button onClick={() => { dispatch({ type: 'decrement' }) }}>减</button>
        </div>
    )
};

export default Child;

