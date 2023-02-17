/*
 * @Author: Lee
 * @Date: 2023-02-07 09:40:12
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-09 15:19:51
 * @Description:
 */
import React from 'react';
import { AppContext } from './context';
import ContextValues from './components/ContextValues';

interface IProps {}
interface IState {
  name: string;
  job: string;
  count: number;
  increment: Function;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: '张三',
      job: '程序猿',
      count: 10,
      increment: this.increment,
    };
  }
  increment = () => {
    this.setState(({ count }) => ({
      count: count + 1,
    }));
  };
  render(): React.ReactNode {
    return (
      <div className='App'>
        <AppContext.Provider value={this.state}>
          <ContextValues />
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
