const dialog = (state = {}, action) => {
    switch (action.type) {
        case "SHOW_DIALOG":
            return { status: true }
        case "CLOSE_DIALOG":
            return { status: false }
        default:
            return state;
    }
}

module.exports = {
    dialog
};

