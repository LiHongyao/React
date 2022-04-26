/*
 * @Author: Lee
 * @Date: 2022-04-26 16:02:59
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-26 16:17:23
 */

import * as React from 'react';

/*
const Input = React.forwardRef((props, ref) => {
  return <input type='text' ref={ref} onInput={props.handleChange} />;
});

export default function App() {
  // -- refs
  const inputRef = React.useRef(null);
  // -- events
  const handleChange = () => {
    const v = inputRef.current.value;
    console.log(v);
  };
  return (
    <div className='App'>
      <Input ref={inputRef} handleChange={handleChange} />
    </div>
  );
}*/

export default function App() {
  // -- state
  const [count, setCount] = React.useState(0);
  // -- refs
  const timerRef = React.useRef(null);

  // -- effects
  React.useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount(count + 1);
    }, 1000);
  }, []);

  React.useEffect(() => {
    if (count === 5) {
      clearInterval(timerRef.current);
    }
  });

  return (
    <div className='App'>
      <p>Current count: {count}</p>
    </div>
  );
}
