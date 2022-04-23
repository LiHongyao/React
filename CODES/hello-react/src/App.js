/*
 * @Author: Lee
 * @Date: 2022-04-08 16:36:33
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-22 23:23:21
 */

import Basic from './components/Basic';
import State from './components/State';
import IForm from './components/Form';
import Promote from './components/Promote';
const App = () => {
  return (
    <div className='App'>
      {/* 基础示例 */}
      <Basic />
      <State />
      <IForm />
      <Promote />
    </div>
  );
};

export default App;
