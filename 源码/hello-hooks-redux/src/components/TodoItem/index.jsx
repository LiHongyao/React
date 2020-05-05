import React, { memo } from 'react';
const TodoItem = props => {
    const {
        todo: {
            id,
            text,
            complete
        }, 
        removeTodoItem,
        toggleTodoItem

    } = props;
    const onChange = () => {
        toggleTodoItem(id);
    }
    const onRemove = () => {
        removeTodoItem(id);
    }
    return (
        <li className="todo-item">
            <input
                type="checkbox"
                onChange={onChange}
                checked={complete}
            />
            <label className={complete ? 'complete' : ''}>{text}</label>
            <button onClick={onRemove}>&#xd7;</button>
        </li>
    )
}
export default memo(TodoItem);