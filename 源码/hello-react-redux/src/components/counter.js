// => 展示组件
import React from 'react'

const Counter = (props) => {
    const { number, message, inCrease, deCrease } = props;
    return (
        <div className="counter">
            <p>{message}</p>
            <button onClick={() => {inCrease(1)}}>+</button>
            {number}
            <button onClick={() => {deCrease(1)}}>-</button>
        </div>
    )
}

export default Counter;

