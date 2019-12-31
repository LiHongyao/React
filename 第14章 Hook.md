# 一、概述

- [Hook](https://react.docschina.org/docs/hooks-intro.html) 是 React 16.8 的新增特性。
- Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用。
- Hook 遵循函数式编程的理念，主旨是在函数组件中引入类组件中的状态和生命周期，并且这些状态和生命周期函数也可以被抽离，实现复用的同时，减少函数组件的复杂性和易用性。

# 二、何时使用？

如果你在编写函数组件并意识到需要向其添加一些 state，以前的做法是必须将其它转化为 class。现在你可以在现有的函数组件中使用 Hook。

# 三、规则

- 只能在顶层调用Hooks，不要在循环、条件或嵌套函数中调用Hook。
- 只在 React 函数中调用 Hook，不要在普通的 JavaScript 函数中调用 Hook。

# 四、API

## 1. [useState](https://react.docschina.org/docs/hooks-reference.html#usestate)  

```react
import React, { useState } from 'react';

const Example = () => {
  // 定义状态
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({username: "", password: ""});
  const [complete, setComplete] = useState(false);
  return (
    <div>
      {/* 读取状态 */}
      <p>You clicked { count } times</p>
      {/* 修改状态 */}
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

> 提示：通过在函数组件里调用 useState 来给组件添加一些内部 state。React 会在重复渲染时保留这个 state。useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并。

## 2. [useEffect](https://react.docschina.org/docs/hooks-reference.html#useeffect)

Effect Hook 可以让你在函数组件中执行副作用操作（数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用）。

```react
import React, { useState, useEffect} from 'react';

const Example = () => {
  // 定义状态
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(count);
  });
  return (
    <div>
      {/* 读取状态 */}
      <p>You clicked { count } times</p>
      {/* 修改状态 */}
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
```

> 提示：
>
> 1、如果你熟悉 React class 的生命周期函数，你可以把 `useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。
>
> 2、使用 `useEffect` 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。

有些副作用可能需要清除，所以需要返回一个函数。

```react
useEffect(() => {
  console.log(count);
  return () => {
    // 清除副作用操作...
  }
});
```

React 允许使用多个 Effect 实现关注点分离。

```react
useEffect(() => {
  console.log(count);
});
useEffect(() => {
  document.title = "Hello";
})
```

默认情况下，useEffect 在第一次渲染之后和每次更新之后都会执行。通过传递第2个参数数组跳过 Effect 进行性能优化。

```react
useEffect(() => {
  console.log(count);
}, [count]);
```

上述代码，会在count变量变化时才会触发effect。

如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。

- [`useContext`](https://react.docschina.org/docs/hooks-reference.html#usecontext)

# 五、额外 API

- [`useReducer`](https://react.docschina.org/docs/hooks-reference.html#usereducer)
- [`useCallback`](https://react.docschina.org/docs/hooks-reference.html#usecallback)
- [`useMemo`](https://react.docschina.org/docs/hooks-reference.html#usememo)
- [`useRef`](https://react.docschina.org/docs/hooks-reference.html#useref)
- [`useImperativeHandle`](https://react.docschina.org/docs/hooks-reference.html#useimperativehandle)
- [`useLayoutEffect`](https://react.docschina.org/docs/hooks-reference.html#uselayouteffect)
- [`useDebugValu`](https://react.docschina.org/docs/hooks-reference.html#usedebugvalue)

# 六、自定义Hook

目前为止，在 React 中有两种流行的方式来共享组件之间的状态逻辑: [render props](https://links.jianshu.com/go?to=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Frender-props.html) 和[高阶组件](https://links.jianshu.com/go?to=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Fhigher-order-components.html)，现在让我们来看看 Hook 是如何在让你不增加组件的情况下解决相同问题的。

```react
import React, { useState, useEffect} from 'react';
import './App.css';

// => 自定义hook
const useBirthStatus = (idCard) => {
  const [birth, setBirth] = useState(null);
  function handleStatusChange(status) {
    setBirth(status);
  }
  useEffect(() => {
    let year = idCard.slice(6, 10);
    let month = idCard.slice(10, 12);
    let day = idCard.slice(12, 14);
    handleStatusChange(`${year}年${month}月${day}日`);
  });
  return birth;
};

// => 提取Hook
const A = () => {
  const birth = useBirthStatus('510123199307168888');
  return (<div className="page">
    <h1 className="title">A</h1>
    <p>出生年月：{birth}</p>
  </div>)
}
// => 提取Hook
const B = () => {
  const birth = useBirthStatus('510123199305278888');
  return (<div className="page">
    <h1 className="title">B</h1>
    <p>出生年月：{birth}</p>
  </div>)
}

function App() {
  return (
    <div className="App">
      <A />
      <B />
    </div>
  );
}

export default App;
```

在两个组件中使用相同的 Hook 会共享 state 吗？不会。自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。

## > 在做个Hook之间传递数据





























