/*
 * @Author: Lee
 * @Date: 2022-04-25 17:13:17
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-25 17:31:28
 */
import { Component } from 'react';
import { AppContext } from './context';
import Child from './Child';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      increment: this.increment.bind(this),
    };
  }
  increment() {
    this.setState(({ count }) => ({
      count: count + 1,
    }));
  }
  render() {
    return (
      // -- 分发数据
      <AppContext.Provider value={this.state}>
        <div className='App'>
          <Child />
        </div>
      </AppContext.Provider>
    );
  }
}
