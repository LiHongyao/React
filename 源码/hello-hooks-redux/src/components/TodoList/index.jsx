import React, { memo } from 'react';
import TodoItem from '../TodoItem';

const TodoList = props => {
    const { todos, toggleTodoItem, removeTodoItem } = props;
    return (
        <div className="todos">
            <ul>
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        toggleTodoItem={toggleTodoItem}
                        removeTodoItem={removeTodoItem}
                    />
                ))}
            </ul>
        </div>
    )
}

export default memo(TodoList);