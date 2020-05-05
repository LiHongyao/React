import {
    COUNTER_DECREMENT,
    COUNTER_INCREMENT
} from '../action-types';


const counter = (state = 0, action) => {
    const { type } = action;
    switch (type) {
        case COUNTER_INCREMENT:
            return state + 1;
        case COUNTER_DECREMENT:
            return state - 1;
        default: {
            return state;
        }
    }
}
export default counter;