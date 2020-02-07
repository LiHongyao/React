// => 默认数据结构
const initialState = {
    card: {
        name: 'Jack',
        picture: 'a.jpg'
    },
    dialog: {
        status: false
    },
};


// => reducers
const reducers = (state = initialState, action) => {
    // => 根据action.type修改state
    switch (action.type) {
        case "CHANGE_NAME":
            return {
                ...state,
                card: { ...state.card, name: action.name },
                dialog: { ...state.dialog }
            };
        case "CHANGE_PICTURE":
            return {
                ...state,
                card: { ...state.card, picture: action.picture },
                dialog: { ...state.dialog }
            };
        case "SHOW_DIALOG":
            return {
                ...state,
                card: { ...state.card },
                dialog: { status: true }
            };
        case "CLOSE_DIALOG":
            return {
                ...state,
                card: { ...state.card },
                dialog: { status: false }
            };
        default:
            return state;
    }
}

module.exports = {
    reducers
}