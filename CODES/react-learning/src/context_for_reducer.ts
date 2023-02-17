/*
 * @Author: Lee
 * @Date: 2023-02-10 09:56:14
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-10 11:30:47
 * @Description:
 */
import React from 'react';

import { StateType, ActionType } from 'src/store';

interface ProviderProps {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}
export const AppContext = React.createContext<ProviderProps>({} as ProviderProps);
