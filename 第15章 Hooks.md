[React Hooks 参考 >>](https://react.docschina.org/docs/hooks-intro.html)

# 一、概述

\1. Hook 是 React 16.8 的新增特性。

\2. Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。

\3. Hook 不能在 class 组件中使用。

\4. Hook 遵循函数式编程的理念，主旨是在函数组件中引入类组件中的状态和生命周期，并且这些状态和生命周期函数也可以被抽离，实现复用的同时，减少函数组件的复杂性和易用性。

**# 何时使用**？

如果你在编写函数组件并意识到需要向其添加一些 state，以前的做法是必须将其它转化为 class。现在你可以在现有的函数组件中使用 Hook。

**# 规则**

- 只能在顶层调用Hooks，不要在循环、条件或嵌套函数中调用Hook。
- 只在 React 函数中调用 Hook，不要在普通的 JavaScript 函数中调用 Hook。

# 二、API

## 01. [useState](https://react.docschina.org/docs/hooks-reference.html#usestate)  *

在类组件当中，state 需要在构造函数中来设置：

```js
// => define states
constructor() {
	super();
	this.state = {}
}
// => update states
this.setState(state => ({}));
```

在函数组件中，通过useState定义状态：

```react
import React, { useState } from 'react'
const Test = () => {
    // => define states
    const [name, setName] = useState("保密");
    const [email, setEmail] = useState("保密");
    const [age, setAge] = useState(0);
    // => Events
    const handleInput = (event) => {
        event.persist();
        const { id, value } = event.target;
        switch (id) {
            // => update states
            case 'name': setName(value); break;
            case 'email': setEmail(value); break;
            case 'age': setAge(value); break;
            default: throw new Error()
        }
    }
    return (
        <React.Fragment>
            <input id='name' type='text' placeholder='姓名' onInput={handleInput} />
            <input id='age' type='number' placeholder='年龄' onInput={handleInput} />
            <input id='email' type='email' placeholder='邮箱' onInput={handleInput} />
            <p>用户信息：{name} -  {age} - {email}</p>
        </React.Fragment>
    )
}
export default Test;
```

> 提示：
>
> \> 通过在函数组件里调用 useState 来给组件添加一些内部 state。React 会在重复渲染时保留这个 state。useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并。
>
> \> 多次使用useState可定义多个状态。

## 02. [useEffect](https://react.docschina.org/docs/hooks-reference.html#useeffect) *

Effect Hook 可以让你在函数组件中执行副作用操作（数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用）。

```react
import React, { useState, useEffect } from 'react'
const Test = () => {
    // => define states
    const [name, setName] = useState("保密");
    const [email, setEmail] = useState("保密");
    const [age, setAge] = useState(0);
    // => effect
    /*
    componentDidMount() {
        // 1. 修改标题
        // 2. 前后端交互
        // 3. 设置订阅/处理一些其他的业务逻辑
    }*/
    useEffect(() => {
        // 修改标题
        document.title = 'Hello-Hooks';
    });
    useEffect(() => { // mount/update/unmount
        console.log(name);
    });
    useEffect(() => { 
        console.log(age);
    });

    // => Events
    const handleInput = (event) => {
        event.persist();
        const { id, value } = event.target;
        switch (id) {
            // => update states
            case 'name': setName(value); break;
            case 'email': setEmail(value); break;
            case 'age': setAge(value); break;
            default: throw new Error()
        }
    }
    return (
        <React.Fragment>
            <input id='name' type='text' placeholder='姓名' onInput={handleInput} />
            <input id='age' type='number' placeholder='年龄' onInput={handleInput} />
            <input id='email' type='email' placeholder='邮箱' onInput={handleInput} />
            <p>用户信息：{name} -  {age} - {email}</p>
        </React.Fragment>
    )
}
export default Test;
```

> 提示：
>
> 1、如果熟悉 React class的生命周期，你可以把 `useEffect` Hook 看做以下三个生命周期函数的组合：
>
> - componentDidMount
> - componentDidUpdate
> - componentWillUnmount
>
>2、使用 `useEffect` 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。

有些副作用可能需要清除，所以需要返回一个函数，该函数在组件即将卸载之前调用：

```react
useEffect(() => {
  // => 业务逻辑
  return () => {
    // => 移除监听器/清除保存的数据/...
  }
});
```

React 允许使用多个 Effect 实现关注点分离。

```react
// Effect
useEffect(() => {
  document.title = "Hello Hooks";
});
useEffect(() => {
  console.log(`count：${count}`);
});
```

默认情况下，useEffect 在第一次渲染之后和每次更新之后都会执行。通过传递第2个参数数组跳过 Effect 进行性能优化。

```react
useEffect(() => {
  console.log(name);
}, [name]);
```

上述代码，会在name变量变化时才会触发effect。

如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（`[]`）作为第二个参数。

```react
useEffect(() => {
  $.ajax(); 
  document.title = 'Hello-Hooks';
}, []);
```

## 03. [useContext](https://react.docschina.org/docs/hooks-reference.html#usecontext) * 

useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>。

./src/context.js

```js
import {createContext} from 'react';

const AppContext = createContext(null);

export default AppContext;
```

./src/app.js

```react
import React from 'react';
import Test from './components/Test';
import AppContext from './context';
const App = () => {
  return (
    <AppContext.Provider value={{username: 'Muzili', tel: '17398888669'}}>
      <div className="App">
        < Test />
      </div>
    </AppContext.Provider>
  );
}
export default App;
```

./src/components/Test.js

```react
import React, { useContext } from 'react'
import AppContext from '../context';

const Test = () => {
    // => context
    let { username, tel } = useContext(AppContext);
    return (
        <React.Fragment>
            <p>AppContext：{username} - {tel}</p>
        </React.Fragment>
    )
}
export default Test;
```

> 注意： useContext 的参数必须是 context 对象本身

## 04. [useReducer](https://react.docschina.org/docs/hooks-reference.html#usereducer) *

语法形式：

```js
const [state, dispatch] = useReducer(reducer, initState);
```

代码示例：

```react
import React, { useReducer } from 'react';

// => state
const initialState = {
    count: 0
};
// => reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count + 1 };
        default: {
            throw new Error();
        }
    }
}
// => component
const UseReducer = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <React.Fragment>
            <p>Count：{state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </React.Fragment>
    )
};

export default UseReducer;
```

useReducer，可以帮助我们集中式的处理复杂的state管理。但如果我们的页面很复杂，拆分成了多层多个组件，我们如何在子组件触发这些state变化呢？我们可以结合 useContext使用，将 dispatch 作为 <b><ins>value</ins></b> 属性传递给子组件即可。我们来看一组示例：

\1. 首先定义store

```js
// 文件位置：src/store/index.js

// => 初始化数据
export const initialState = {
    message: '众志成城，抗疫救灾',
    count: 0
};

// => Reducer 处理函数
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'increment':
            return {
                ...state,
                count: state.count + 1
            };
        case 'decrement':
            return {
                ...state,
                count: state.count - 1
            };
        default: {
            throw new Error();
        }
    }
}
```
\2. 创建一个Context上下文
```js
// 文件位置：src/context.js
import { createContext } from 'react';

const AppContext = createContext(null);

export default AppContext;
```
\3. 在App.js 中使用useReducer，然后将dispatch通过上下文（context）共享给子组件
```react
import React, { useReducer } from 'react';
import AppContext from './context';
import { initialState, reducer } from './store';

import Child from './components/Child';

const App = () => {
  // => state：状态
  // => dispatch：触发action/数据
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // => 通过上下文将state、dispatch 分发给子组件
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="App">
        < Child />
      </div>
    </AppContext.Provider>
  );
}
export default App;
```
\4. 在子组件中通过useContext拿到state、dispatch使用
```react
import React, { useContext } from 'react';
import AppContext from '../context';

const Child = () => {
    const { state, dispatch } = useContext(AppContext);
    return (
        <div className='Child'>
            {/* 读取状态 */}
            <p>count: {state.count}</p>
            <p>message: {state.message}</p>
            {/* 触发action更新数据 */}
            <button onClick={() => { dispatch({ type: 'increment' }) }}>加</button>
            <button onClick={() => { dispatch({ type: 'decrement' }) }}>减</button>
        </div>
    )
};

export default Child;
```

## 05. [useRef](https://react.docschina.org/docs/hooks-reference.html#useref) *

useRef 用来生成对 DOM 对象的引用

```react
import React, { useRef } from 'react';

const UseRefTest = (props) => {
    let usernameInput = useRef(null);
    let passwordInput = useRef(null);
    // => events
    const handleButtonClick = () => {
        let username = usernameInput.current.value;
        let password = passwordInput.current.value;
        if(username === "admin" && password === "123") {
            window.console.log("login success!");
        }else {
            window.console.log("login error!");
        }
    }
    return (
        <React.Fragment>
            <h3>3. useRef</h3>
            <input ref={usernameInput} placeholder="账号" type="text"></input>
            <input ref={passwordInput} placeholder="密码" type="password"></input>
            <br />
            <button onClick={handleButtonClick}>登陆</button>
        </React.Fragment>
    )
}
export default UseRefTest;
```

## 06. [useCallback](https://react.docschina.org/docs/hooks-reference.html#usecallback)

## 07. [useMemo](https://react.docschina.org/docs/hooks-reference.html#usememo)

## 08. [useImperativeHandle](https://react.docschina.org/docs/hooks-reference.html#useimperativehandle)

通过 useImperativeHandle 用于让父组件获取子组件内的索引，该 Hook 应该与forwardRef 结合使用，如下所示：

```react
// -> 文件位置：app.js
import React, {useRef, useImperativeHandle, useEffect, forwardRef } from 'react';

const Child = (props, ref) => {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => inputRef.current);
  return (
    <input ref={inputRef}/>
  )
}

const ChildInput = forwardRef(Child);

function App() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [])
  return (
    <div className="app">
      <ChildInput ref={inputRef}/>
    </div>
  )
}
export default App;
```

## 09. [useLayoutEffect](https://react.docschina.org/docs/hooks-reference.html#uselayouteffect)

大部分情况下，使用 useEffect 就可以帮我们处理组件的副作用，但是如果想要同步调用一些副作用，比如对 DOM 的操作，就需要使用 useLayoutEffect，useLayoutEffect 中的副作用会在 DOM 更新之后同步执行。

> 官方提示：
>
> 如果你正在将代码从 class 组件迁移到使用 Hook 的函数组件，则需要注意 useLayoutEffect 与 componentDidMount、componentDidUpdate 的调用阶段是一样的。但是，我们推荐你一开始先用 useEffect，只有当它出问题的时候再尝试使用 useLayoutEffect。

## 10. [useDebugValue](https://react.docschina.org/docs/hooks-reference.html#usedebugvalue)

# 三、自定义Hook

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





























