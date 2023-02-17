/*
 * @Author: Lee
 * @Date: 2023-02-10 12:20:21
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-10 13:22:42
 * @Description:
 */
import React, { useEffect, useRef, useState } from 'react';
const App: React.FC = () => {
  // -- state
  const [count, setCount] = useState(5);
  // -- refs
  const timer = useRef<NodeJS.Timer>();
  // -- effects
  useEffect(() => {
    timer.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
  }, []);
  useEffect(() => {
    if (count === 0) {
      clearInterval(timer.current);
    }
  });
  // -- renders
  return <p>Current Count：{count}</p>;
};

export default App;

// interface IProps {
//   onChange: React.ChangeEventHandler<HTMLInputElement>;
// }
// const MyInput = React.forwardRef<HTMLInputElement, IProps>((props, ref) => {
//   return <input ref={ref} onChange={props.onChange} />;
// });

// const App: React.FC = () => {
//   // -- refs
//   const input = useRef<HTMLInputElement>(null);
//   // -- events
//   const onChange = () => {
//     console.log(input.current?.value);
//   };
//   // -- renders
//   return (
//     <div>
//       <MyInput ref={input} onChange={onChange} />
//     </div>
//   );
// };

// export default App;
