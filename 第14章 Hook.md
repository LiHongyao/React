# 一、概述

- [Hook](https://react.docschina.org/docs/hooks-intro.html) 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。Hook 遵循函数式编程的理念，主旨是在函数组件中引入类组件中的状态和生命周期，并且这些状态和生命周期函数也可以被抽离，实现复用的同时，减少函数组件的复杂性和易用性。
- 函数组件 (functional component) 内部能够”钩住“ React 内部的 state 和 life-cycles。
- 真正功能强大的地方是使我们能够更轻松地复用组件逻辑（custom hooks）。
- 让FunctionalComponent具有ClassComponent的功能。

# 二、何时使用？

如果你在编写函数组件并意识到需要向其添加一些 state，以前的做法是必须将其它转化为 class。现在你可以在现有的函数组件中使用 Hook。

# 三、规则

- 只能在顶层调用Hooks，不要在循环、条件或嵌套函数中调用Hook。
- 只能在函数组件中使用。

# 四、API

## 1. [useState](https://react.docschina.org/docs/hooks-reference.html#usestate)  

<h3 style="color: red;">Class</h3>   

```react
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

State Hook

```react
import React, { useState } from 'react';

export default () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}
```



## 2. [useEffect](https://react.docschina.org/docs/hooks-reference.html#useeffect)

- [`useContext`](https://react.docschina.org/docs/hooks-reference.html#usecontext)

- [`useReducer`](https://react.docschina.org/docs/hooks-reference.html#usereducer)
- [`useCallback`](https://react.docschina.org/docs/hooks-reference.html#usecallback)
- [`useMemo`](https://react.docschina.org/docs/hooks-reference.html#usememo)
- [`useRef`](https://react.docschina.org/docs/hooks-reference.html#useref)
- [`useImperativeHandle`](https://react.docschina.org/docs/hooks-reference.html#useimperativehandle)
- [`useLayoutEffect`](https://react.docschina.org/docs/hooks-reference.html#uselayouteffect)
- [`useDebugValu`](https://react.docschina.org/docs/hooks-reference.html#usedebugvalue)



