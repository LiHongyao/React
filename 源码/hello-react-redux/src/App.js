import React from 'react';
// => 导入容器组件（内部包含了展示组件）
import Counter from './containers/counter';

const App = () => {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}
export default App;
