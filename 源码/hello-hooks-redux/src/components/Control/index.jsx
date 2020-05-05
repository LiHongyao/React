import React, { useRef, memo } from 'react';
let idSeq = Date.now();
const Control = props => {
    const { addTodo } = props;
    const inputRef = useRef();
    const onSubmit = (ev) => {
        ev.preventDefault();
        const newText = inputRef.current.value.trim();
        if (!newText) return;
        addTodo({
            id: ++idSeq,
            text: inputRef.current.value,
            complete: false
        });
        inputRef.current.value = '';
    }
    return (
        <div className="control">
            <h1>todos</h1>
            <form action="#" onSubmit={onSubmit}>
                <input
                    type="text"
                    className="new-todo"
                    placeholder="What needs to be done?"
                    ref={inputRef}
                />
            </form>
        </div>
    )
}

export default memo(Control);