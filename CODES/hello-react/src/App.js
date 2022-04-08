// -- 函数组件
const App = () => {
  // -- constants
  const name = 'Li-HONGYAO';
  const isLogin = true;

  // -- methods
  const renderTips = (name) => {
    if (name) {
      return <p>Hello, {name}！</p>;
    }
    return <p>Hello, Girls！</p>;
  };
const element = (
  <div>
    <p className='name'>Name：Li-HONGYAO</p>
    <p className='tel'>Phone：17398888669</p>
  </div>
);
  // -- render
  return (
    <div className='App'>
      <p>Hello, React.js!</p>
      {/* JSX-表达式 */}
      {name} - {isLogin ? '已登录' : '未登录'}
      {renderTips(name)}
    </div>
  );
};

// -- 导出组件
export default App;
