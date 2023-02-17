/*
 * @Author: Lee
 * @Date: 2023-02-07 19:04:10
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-08 09:28:06
 * @Description:
 */
import React from 'react';

interface IProps {}
interface IState {
  title: string /** 标题 */;
  intro: string /** 描述 */;
  kinds: string /** 类型 */;
}
class Forms extends React.Component<IProps, IState> {
  // -- constructor
  constructor(props: IProps) {
    super(props);
    this.state = {
      title: '',
      intro: '',
      kinds: '',
    };
  }
  // -- events
  onSubmit = () => {
    console.log(this.state);
  };

  onChange = ($event: any) => {
    const { name, value } = $event.currentTarget;
    const k = name as keyof IState;
    this.setState({
      [k]: value,
    } as Pick<IState, keyof IState>);
  };

  // -- render
  render(): React.ReactNode {
    return (
      <form>
        <p>
          <span>标题：</span>
          <input
            name='title'
            placeholder='请输入新闻标题'
            value={this.state.title}
            onChange={this.onChange}
          />
        </p>
        <p>
          <span>描述：</span>
          <textarea
            name='intro'
            placeholder='请输入新闻描述'
            value={this.state.intro}
            onChange={this.onChange}
          />
        </p>
        <p>
          <span>城市：</span>
          <select
            name='kinds'
            value={this.state.kinds}
            onChange={this.onChange}
          >
            <option value=''>——请选择——</option>
            <option value='社会'>社会</option>
            <option value='经济'>经济</option>
            <option value='娱乐'>娱乐</option>
            <option value='汽车'>汽车</option>
          </select>
        </p>
        <button type='button' onClick={this.onSubmit}>
          确认提交
        </button>
      </form>
    );
  }
}

class NameForm extends React.Component {
  /** define input refs */
  input: React.RefObject<HTMLInputElement>;
  /** constructor */
  constructor(props: any) {
    super(props);
    this.input = React.createRef<HTMLInputElement>();
  }
  /** events */
  onSubmit = () => {
    console.log(this.input.current?.value);
  };
  /** renders */
  render(): React.ReactNode {
    return (
      <form>
        <p>
          <span>Name：</span>
          <input ref={this.input} placeholder='Please enter.' />
        </p>
        <button type='button' onClick={this.onSubmit}>
          Submit
        </button>
      </form>
    );
  }
}

class FileInput extends React.Component {
  /** define input refs */
  file: React.RefObject<HTMLInputElement>;
  /** constructor */
  constructor(props: any) {
    super(props);
    this.file = React.createRef<HTMLInputElement>();
  }
  /** events */
  onSubmit = ($event: any) => {
    $event.preventDefault();
    // @ts-ignore
    const files = this.file.current.files;
    console.log(`Selected file - ${files ? files[0].name : '-'}`);
  };
  /** renders */
  render() {
    return (
      <form style={{ display: 'flex', alignItems: 'center' }}>
        <input type='file' ref={this.file} />
        <button type='button' onClick={this.onSubmit}>
          上传文件
        </button>
      </form>
    );
  }
}

export { Forms, NameForm, FileInput };
