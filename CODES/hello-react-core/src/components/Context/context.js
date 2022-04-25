/*
 * @Author: Lee
 * @Date: 2022-04-25 17:13:47
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-25 17:25:06
 */

import { createContext } from 'react';

export const AppContext = createContext({
  count: 0,
  increment: () => {},
});
