import React, { MouseEventHandler, useState } from 'react';

interface IProps {
  count: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
function TapButton({ count, onClick }: IProps) {
  return <button onClick={onClick}>Clicked {count} Times.</button>;
}

function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);
  return (
    <div className='App'>
      <p>Hello，React.js!</p>
      <TapButton count={count} onClick={handleClick} />
      <TapButton count={count} onClick={handleClick} />
    </div>
  );
}

export default App;
