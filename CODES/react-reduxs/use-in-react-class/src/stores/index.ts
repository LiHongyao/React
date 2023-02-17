/*
 * @Author: Lee
 * @Date: 2023-02-16 18:06:03
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-17 16:21:45
 * @Description:
 */
import { applyMiddleware, createStore } from 'redux';
import { asyncMiddleware } from './middlewares';
import { rootReducer } from './reducers';

const store = createStore(rootReducer, applyMiddleware(asyncMiddleware));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
