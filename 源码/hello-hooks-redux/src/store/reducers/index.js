import {combineReducers} from 'redux';
import todos from './todos';
import counter from './counter';


const reducers = combineReducers({
    todos,
    counter
})

export default reducers;
