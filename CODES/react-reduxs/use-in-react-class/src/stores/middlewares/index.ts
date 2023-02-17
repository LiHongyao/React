/*
 * @Author: Lee
 * @Date: 2023-02-16 19:09:20
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-16 20:52:52
 * @Description:
 */

import { Middleware } from 'redux';
export const asyncMiddleware: Middleware = (storeApi) => (next) => (action) => {
  if (typeof action === 'function') {
    // → 如果传入的action是一个函数
    // → 调用该函数并传入 dispatch 和 getState 作为参数
    return action(storeApi.dispatch, storeApi.getState);
  } else {
    // → 否则，它就是一个普通 action，那就继续执行
    return next(action);
  }
};
