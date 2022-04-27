/*
 * @Author: Lee
 * @Date: 2022-04-26 17:44:45
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-27 09:12:57
 */
const { configureStore } = require('@reduxjs/toolkit');
const { reducer } = require('./reducers');
// 根据reducers创建store对象
const store = configureStore({ reducer });

module.exports = {
  store,
};
