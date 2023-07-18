/*
 * @Author: Lee
 * @Date: 2023-02-17 20:52:40
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-17 21:05:23
 * @Description:
 */

import React, { useContext } from 'react';

const initialState = { name: '张三', job: '程序猿' };
const AppContext = React.createContext(initialState);

const Child: React.FC = () => {
  const { name, job } = useContext(AppContext);
  return (
    <div>
      {name} - {job}{' '}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppContext.Provider value={initialState}>
      <Child />
    </AppContext.Provider>
  );
};

export default App;
