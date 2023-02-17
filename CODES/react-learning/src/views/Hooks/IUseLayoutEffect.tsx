import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';

interface IProps {
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
}
const Child: React.FC<IProps> = React.memo((props) => {
  // 父组件只要已更新就会打印
  console.log('__render_child__');
  return (
    <button type='button' onClick={props.onSubmit}>
      SEND MESSAGE
    </button>
  );
});



const App = () => {
  // -- state
  const [text, setText] = useState('');
  // -- events
  const onChange = ($event: ChangeEvent<HTMLInputElement>) => {
    setText($event.target.value);
  };
  const onSubmit = () => {};
  return (
    <div className='app'>
      <p>Message：{text}</p>
      <input onChange={onChange} />
      <Child onSubmit={onSubmit} />
    </div>
  );
};

export default App;
