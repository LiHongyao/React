/*
 * @Author: Lee
 * @Date: 2023-02-16 21:07:50
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-16 21:08:15
 * @Description: 
 */
import { combineReducers } from 'redux';

import counterReducer from './counterReducer';
import statusReducer from './statusReducer';

export const rootReducer = combineReducers({
  counter: counterReducer,
  status: statusReducer,
});