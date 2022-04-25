# 一、概述

[Context](https://zh-hans.reactjs.org/docs/context.html) 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

当你不想在组件树中通过逐层传递 `props` 或者 `state` 的方式来传递数据时，可以使用 `Context` 来实现**跨层级**的组件数据传递。

<img src="./IMGS/props-state-flow.png" style="zoom:33%;" />

使用props或者state传递数据，数据自上而下流动（单向数据流），使用 `Context`，可以跨越组件进行数据传递，如下所示：

<img src="./IMGS/props-state-context.png" style="zoom: 33%;" />



# 二、API

- [`React.createContext`](https://zh-hans.reactjs.org/docs/context.html#reactcreatecontext)：创建上下文
- [`Context.Provider`](https://zh-hans.reactjs.org/docs/context.html#contextprovider)：分发
- [`Class.contextType`](https://zh-hans.reactjs.org/docs/context.html#classcontexttype)：订阅单个context
- [`Context.Consumer`](https://zh-hans.reactjs.org/docs/context.html#contextconsumer)：订阅多个context

# 三、静态传递

静态传递数据只是通过上下文将数据分发至子组件

*`./src/context.jsx`*

```jsx
import { createContext } from 'react';
export const AppContext = createContext(null);
```

*`./src/app.jsx`*

```jsx
import { AppContext } from './context';
import Child from './components/Child';
export default function App() {
  return (
    // -- 分发数据
    <AppContext.Provider value={{ name: 'Li-HONGYAO', job: '前端工程师' }}>
      <div className='App'>
        <Child />
      </div>
    </AppContext.Provider>
  );
}
```

*`./src/components/child.jsx`*

```react
import { Component } from 'react';
import { AppContext } from '../context';
export default class Child extends Component {
  render() {
    return (
      <div>
        {this.context.name} -{this.context.job}
      </div>
    );
  }
}
// -- 订阅上下文
Child.contextType = AppContext;
```

# 四、动态传递

动态传递即将需要分发的数据绑定在 `state` 上，并且分发修改状态的方法给子组件使用。

*`./src/context.js`*

```js
import { createContext } from 'react';

export const AppContext = createContext({
  count: 0,
  increment: () => {},
});
```

*`./src/components/child.js`*

```js
import { Component } from 'react';
import { AppContext } from '../context';
export default class Child extends Component {
  render() {
    const { count, increment } = this.context;
    return (
      <div>
        <button onClick={increment}>Click {count} times!</button>
      </div>
    );
  }
}
// -- 订阅上下文
Child.contextType = AppContext;
```

*`./src/app.js`*

```react
import { Component } from 'react';
import { AppContext } from './context';
import Child from './components/Child';

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
```

















