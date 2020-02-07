const { createStore } =  require("redux");
const { reducers } = require('./reducer');

const initialState = {
    card: {
        name: 'Muzili',
        picture: 'a.jpg'
    },
    dialog: {
        status: false
    },
};

// 根据reducers创建store对象
const store = createStore(reducers, initialState);

module.exports = {
    store
}



