/*
 * @Author: Lee
 * @Date: 2023-02-09 15:38:54
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-09 16:19:08
 * @Description:
 *
 */

import React, { useRef } from 'react';

interface IProps {}
const CustomTextInput: React.FC<IProps> = (props) => {
  // -- refs
  const textInput = useRef<HTMLInputElement>(null);
  // -- methods
  const onTap = () => {
    textInput.current?.focus();
  };

  return (
    <>
      <input type='text' ref={textInput} />
      <input type='button' value='Focus the text input' onClick={onTap} />
    </>
  );
};

export default CustomTextInput;
/*
import React, { RefObject } from 'react';
interface IProps {}
interface IState {}
class CustomTextInput extends React.Component<IProps, IState> {
  textInput: RefObject<HTMLInputElement>;

  constructor(props: IProps) {
    super(props);
    this.textInput = React.createRef();
  }
  focusTextInput = () => {
    this.textInput.current?.focus();
  };
  render(): React.ReactNode {
    return (
      <>
        <input type='text' ref={this.textInput} />
        <input
          type='button'
          value='Focus the text input'
          onClick={this.focusTextInput}
        />
      </>
    );
  }
}
export default CustomTextInput; */

/*class AutoFocusTextInput extends React.Component<IProps, IState> {
  textInput: RefObject<CustomTextInput>;
  constructor(props: IProps) {
    super(props);
    this.textInput = React.createRef();
  }
  componentDidMount() {
    this.textInput.current?.focusTextInput();
  }

  render() {
    return <CustomTextInput ref={this.textInput} />;
  }
}
export default AutoFocusTextInput;*/

/*class RefsExample extends React.Component<IProps, IState> {
  inputRef: RefObject<HTMLInputElement>;

  constructor(props: IProps) {
    super(props);
    this.inputRef = React.createRef();
  }

  onTap = () => {
    const input = this.inputRef.current;
    console.log(input?.value);
  };

  render(): React.ReactNode {
    return (
      <>
        <input ref={this.inputRef} />
        <button onClick={this.onTap}>SEND MSG</button>
      </>
    );
  }
}

export default RefsExample;*/
