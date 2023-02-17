/*
 * @Author: Lee
 * @Date: 2023-02-09 14:35:36
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-09 20:45:19
 * @Description:
 */
import React from 'react';

interface ProviderProps {
  name: string;
  job: string;
  // count: number;
  // increment: Function;
}
export const AppContext = React.createContext<ProviderProps | null>(null);
