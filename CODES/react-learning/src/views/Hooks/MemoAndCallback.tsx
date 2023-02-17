import React, { useState, useCallback } from 'react';

interface IProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const Child: React.FC<IProps> = React.memo((props) => {
  console.log('__render_child__');
  return <input onChange={props.onChange} />;
});

const Parent: React.FC = () => {
  // -- states
  const [text, setText] = useState('');
  // -- methods

  /* 优化前
  const onChange = ($event: React.ChangeEvent<HTMLInputElement>) => {
    setText($event.target.value);
  }*/

  const onChange = useCallback(
    ($event: React.ChangeEvent<HTMLInputElement>) => {
      setText($event.target.value);
    },
    []
  );

  // -- renders
  return (
    <div>
      <p>Text: {text} </p>
      <Child onChange={onChange} />
    </div>
  );
};

export default Parent;
