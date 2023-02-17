/*
 * @Author: Lee
 * @Date: 2023-02-16 21:06:27
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-17 13:40:27
 * @Description:
 */
/*
 * @Author: Lee
 * @Date: 2023-02-16 21:06:27
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-16 21:08:24
 * @Description:
 */
import { AnyAction, applyMiddleware, createStore } from 'redux';
import { rootReducer } from './reducers';
import thunkMiddleware from 'redux-thunk';
import type { ThunkAction, ThunkMiddleware } from 'redux-thunk';
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware as ThunkMiddleware) /* 注册中间件*/
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;
