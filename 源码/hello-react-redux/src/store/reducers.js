// => ./src/store/reducers.js

import { INCREASE, DECREASE } from './action-types';

const initialState = {
    number: 0,
    message: '众志成城，抗疫救灾'
};

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case INCREASE:
            return {
                ...state,
                number: state.number + action.number
            };
        case DECREASE:
            return {
                ...state,
                number: state.number - action.number
            };
        default: {
            return state;
        }
    }
}

export default reducers;
