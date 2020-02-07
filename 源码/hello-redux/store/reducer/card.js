const card = (state = {}, action) => {
    switch (action.type) {
        case "CHANGE_NAME":
            return { ...state, name: action.name }
        case "CHANGE_PICTURE":
            return { ...state, picture: action.picture }
        default:
            return state;
    }
}

module.exports = {
    card
}
