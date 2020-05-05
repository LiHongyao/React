import {
    TODOS_ADD,
    TODOS_REMOVE,
    TODOS_TOGGLE
} from '../action-types.js'


export const addTodo = todo => ({
    type: TODOS_ADD,
    payload: todo
})

export const removeTodo = id => ({
    type: TODOS_REMOVE,
    payload: id
})

export const toggleTodo = id => ({
    type: TODOS_TOGGLE,
    payload: id
})
