/*
 * @Author: Lee
 * @Date: 2022-04-08 16:36:33
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-22 17:08:15
 */

import Basic from './components/Basic';
import State from './components/State';
import IForm from './components/Form';
const App = () => {
  return (
    <div className='App'>
      {/* 基础示例 */}
      <Basic />
      <State />
      <IForm />
    </div>
  );
};

export default App;
