/*
 * @Author: Lee
 * @Date: 2022-04-27 09:44:39
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-27 09:44:39
 */
import { INCREMENT, DECREMENT } from './action-types';

export const increment = (number) => ({ type: INCREMENT, number });
export const decrement = (number) => ({ type: DECREMENT, number });
