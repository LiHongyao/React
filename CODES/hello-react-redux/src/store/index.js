/*
 * @Author: Lee
 * @Date: 2022-04-27 09:47:19
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-27 09:57:52
 */

import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';

export default configureStore({
  reducer: reducers
});
