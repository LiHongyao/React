import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

/** Component of Dialog. */
interface IProps {
  title: string;
  message: string;
}
export interface DialogRefs {
  value: string;
  msg: string;
  printSomething: () => void;
}
const Dialog = React.forwardRef<DialogRefs, IProps>((props, ref) => {
  // -- refs
  const [text] = useState('Oops!');
  // -- outs refs
  useImperativeHandle(
    ref,
    () => ({
      value: text /** 暴露状态 */,
      msg: 'Giving is a reward in itself.' /** 暴露常量 */,
      printSomething: () =>
        console.log('Nothing is impossible!') /** 暴露方法 */,
    }),
    [text] /** 依赖，当 text 变化时会重新计算 */
  );
  // -- renders
  return (
    <div className='dialog'>
      <h3>{props.title}</h3>
      <p>{props.message}</p>
    </div>
  );
});

/** Component of App. */
const App: React.FC = () => {
  // -- refs
  const ref = useRef<DialogRefs>(null);
  // -- effecs
  useEffect(() => {
    console.log(ref.current?.msg);
    console.log(ref.current?.value);
    ref.current?.printSomething();
  }, []);
  // -- renders
  return (
    <Dialog
      ref={ref}
      title={'Tips'}
      message={'All things come to those who wait.'}
    />
  );
};
export default App;
