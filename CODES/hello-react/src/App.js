/*
 * @Author: Lee
 * @Date: 2022-04-08 16:36:33
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-24 11:15:47
 */

import Basic from './components/Basic';
import State from './components/State';
import IForm from './components/Form';
import Promote from './components/Promote';
import Slot from './components/Slot';
const App = () => {
  return (
    <div className='App'>
      {/* 基础示例 */}
      <Basic />
      <State />
      <IForm />
      <Promote />
      <Slot />
    </div>
  );
};

export default App;
