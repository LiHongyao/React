/*
 * @Author: Lee
 * @Date: 2022-04-27 09:05:16
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-27 09:13:32
 */

// 引入combineReducers，合并reducer
const { combineReducers } = require('redux');
// 引入两个子reducer
const { card } = require('./card');
const { dialog } = require('./dialog');

// 合并reducers
const reducer = combineReducers({
  card,
  dialog,
});

// 导出合并之后的reduces
module.exports = {
  reducer,
};
