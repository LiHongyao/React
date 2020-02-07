import React, { useReducer } from 'react';
import Test from './components/Test';
import Child from './components/Child'
import AppContext from './context';
import { initialState, reducer } from './store';
import HocTest from './components/Hoc';

const App = () => {

  // => state：状态
  // => dispatch：触发action/数据
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // => 通过上下文将state、dispatch 分发给子组件
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="App">
        < Test />
        < Child />
        < HocTest />
      </div>
    </AppContext.Provider>
  );
}
export default App;



