// 引入combineReducers，合并reducer
const { combineReducers } = require("redux");
// 引入两个子reducer
const { card } = require("./card");
const { dialog } = require("./dialog");

// 合并reducers

const reducers = combineReducers({
    card,
    dialog
});

// 导出合并之后的reduces
module.exports = {
    reducers
}