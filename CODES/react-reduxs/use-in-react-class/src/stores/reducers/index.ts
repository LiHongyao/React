/*
 * @Author: Lee
 * @Date: 2023-02-16 18:06:55
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-16 19:51:44
 * @Description: 
 */
import { combineReducers } from 'redux';

import counterReducer from './counterReducer';
import statusReducer from './statusReducer';

export const rootReducer = combineReducers({
  counter: counterReducer,
  status: statusReducer,
});
