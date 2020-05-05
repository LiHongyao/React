
import {
    TODOS_ADD,
    TODOS_REMOVE,
    TODOS_TOGGLE
} from '../action-types'

const defaultList = [
    {
        id: Date.now(),
        text: '学习React Hooks',
        complete: false
    }
]
const todos = (state = defaultList, action) => {
    const { type, payload } = action;
    switch (type) {
        case TODOS_ADD:
            return [
                ...state,
                payload
            ]
        case TODOS_REMOVE:
            return state.filter(todo => todo.id !== payload);
        case TODOS_TOGGLE:
            return state.map(todo => todo.id === payload ? {...todo, complete: !todo.complete} : todo);
        default: {
            return state;
         }
    }
}

export default todos;
