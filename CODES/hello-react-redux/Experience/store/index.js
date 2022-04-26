/*
 * @Author: Lee
 * @Date: 2022-04-26 17:44:45
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-26 17:46:53
 */
const { createStore } = require('redux');
const { reducers } = require('./reducers');
// 根据reducers创建store对象
const store = createStore(reducers);

module.exports = {
  store,
};
