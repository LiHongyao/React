# 一、概述

[React Hooks >>](https://zh-hans.reactjs.org/docs/hooks-intro.html) 是 React 16.8 的新增特性。它可以让你在不编写 `class` 的情况下使用 `state` 以及其他的 React 特性。

```jsx
import { useState } from 'react';

export default function App() {
  // -- state
  const [count, setCount] = useState(0);
  // -- render
  return (
    <div>
      <p>You Click the Button {count} times.</p>
      <button type='button' onClick={() => setCount(count + 1)}>
        Tap me.
      </button>
    </div>
  );
}
```

`useState` 是我们要学习的第一个 “Hook”，这个例子是简单演示。如果不理解也不用担心。

## 动机

1）类组件状态逻辑复用难

- 缺少复用机制
- 渲染属性和高阶组件导致层级冗余

2）趋向复杂难以维护

- 生命周期函数混杂不相干逻辑
- 相干逻辑分散在不同生命周期

3）`this` 指向困扰

- 内联函数过度创新句柄
- 类成员函数不能保证this

## 优势

- 函数组件无 `this` 问题；
- 自定义Hook方便复用状态逻辑；
- 副作用的关注点分离；

## 渐进策略

**官方没有计划从 React 中移除 class**，所以，Hook 的使用完全是可选的。Hook 和现有代码可以同时工作，你可以渐进式地使用他们

## 使用规则

Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

- 只能在**函数最外层**调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 **React 的函数组件**中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）

# 二、API

## [useState](https://zh-hans.reactjs.org/docs/hooks-reference.html#usestate)  

语法形式：

```jsx
const [state, setState] = useState(initialState);
```

- `state`：当前状态；
- `setState`：更新状态的函数，接收新值，替换旧值，加入渲染队列，统一重新渲染；
- `initialState`：初始值，只会在初始渲染时使用，可以是基本数据类型也可以是对象；

代码示例：

```jsx
import { useState } from 'react';

export default function App() {
  // -- state
  const [count, setCount] = useState(0);
  // -- render
  return (
    <div>
      <p>You Click the Button {count} times.</p>
      <button type='button' onClick={() => setCount(count + 1)}>
        Tap me.
      </button>
    </div>
  );
}
```

**1）函数式更新**

如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 `setState`。该函数将接收先前的 state，并返回一个更新后的值。

```jsx
<button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
```

如果你的更新函数返回值与当前 state 完全相同，则随后的重渲染会被完全跳过。

> 注意：
>
> 与 class 组件中的 `setState` 方法不同，`useState` 不会自动合并更新对象。你可以用函数式的 `setState` 结合展开运算符来达到合并更新对象的效果。
>
> ```jsx
> const [state, setState] = useState({});
> setState(prevState => {
>   // 也可以使用 Object.assign
>   return {...prevState, ...updatedValues};
> });
> ```

**2）惰性初始化**

`initialState` 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用：

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

## [useEffect](https://zh-hans.reactjs.org/docs/hooks-reference.html#useeffect) 

Effect Hook 可以让你在函数组件中执行副作用（数据获取，订阅或者手动修改DOM）操作。`useEffect` 就是一个 Effect Hook，它跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API。

例如，下面这个组件在 React 更新 DOM 后会设置一个页面标题：

```jsx
import { useState, useEffect } from 'react';

export default function App() {
  // -- state
  const [count, setCount] = useState(0);
  // -- effects
  // -- 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  // -- render
  return (
    <div>
      <p>You Click the Button {count} times.</p>
      <button type='button' onClick={() => setCount(prevCount => prevCount + 1)}>Tap me.</button>
    </div>
  );
}
```

当你调用 `useEffect` 时，就是在告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数。

由于副作用函数是在组件内声明的，所以它们可以访问到组件的 props 和 state。默认情况下，React 会在每次渲染后调用副作用函数 —— **包括**第一次渲染的时候。

**1）清除 effect**

副作用函数还可以通过返回一个函数来指定如何“清除”副作用，如：

```react
useEffect(() => {
  // -- 副作用操作（订阅、定时器...)
  return () => {
    // -- 清除副作用（移除订阅、定时器等操作...）
  };
});
```

**2）关注点分离**

React 允许使用多个 Effect 实现关注点分离。

```react
useEffect(() => {
  document.title = "Hello Hooks";
});
useEffect(() => {
  console.log(`count：${count}`);
});
```

**3）条件之星**

默认情况下，effect 会在每轮组件渲染完成后执行。这样的话，一旦 effect 的依赖发生变化，它就会被重新创建。

通过传递第2个参数（它是 effect 所依赖的值数组），可让其只在指定属性变化时重新创建。

```jsx
useEffect(() => {
  console.log(name);
}, [name]);
```

上述代码，会在 `name` 属性变化时才会触发 `effect`。

如果想执行  **只运行一次** 的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（`[]`）作为第二个参数。

```jsx
useEffect(() => {
  $.ajax(); 
  document.title = 'Hello-Hooks';
}, []);
```

## [useContext](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext) 

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

- 获取子组件或者DOM节点的句柄
- 渲染周期之间共享数据的存储

### # useRef

useRef返回一个可变的ref对象,其`.current`属性被初始化为传入的参数`(initialValue)`。返回的ref对象在整个生命周期内保持不变。

```react
import React, { useRef } from 'react';

const App = () => {
  // refs
  // 关键代码
  const inputRef = useRef(null);
  // event
  const handleButtonClick = () => {
    // current指向挂载元素
    const value = inputRef.current.value;
    console.log(value);
  }
  // render
  return (
    <div className="App">
      {/* 关键代码 */}
      <input type="text" ref={inputRef} />
      <button type="button" onClick={handleButtonClick}>读取输入框的值</button>
    </div>
  );
}

export default App;
```

### # forwardRef

如果上述示例中不是input标签，而是一个组件应该如何处理呢？这个时候我们就需要使用到 forwardRef啦。

```react
import React, { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
    return (
        <input ref={ref}/>
    )
});

export default Input;
```

然后在App.js里面调用。

```react
import React, { useRef } from 'react';
import Input from './components/Input';

const App = () => {
  // refs
  // 关键代码
  const inputRef = useRef(null);
  // event
  const handleButtonClick = () => {
    // current指向挂载元素
    const value = inputRef.current.value;
    console.log(value);
  }
  // render
  return (
    <div className="App">
      {/* 关键代码 */}
      <Input type="text" ref={inputRef} />
      <button type="button" onClick={handleButtonClick}>读取输入框的值</button>
    </div>
  );
}

export default App;
```

可以看到React.forwardRef 接受一个渲染函数，其接收 props 和 ref 参数并返回一个 React 节点。这样我们就将父组件中创建的`ref`转发进子组件，并赋值给子组件的input元素。

我们刚刚讲到，useRef可以实现渲染周期之间的共享数据的存储，我们来看如下示例：

```jsx
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [count, setCount] = useState(0);
  const timerRef = useRef();
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
  }, [])
  useEffect(() => {
    if (count === 10) {
      clearInterval(timerRef.current);
    }
  })
  return (
    <div className="App">
      <p>count: {count}</p>
    </div>
  )
}

export default App;
```

上面这个示例，我们使用useRef来记录timer，使得可以正常清除，试想一下，如果我们使用一个变量保存会怎样呢？显示不会正常清除，因为组件在每次渲染时都会重新复制timer变量。

## 06. [useImperativeHandle](https://react.docschina.org/docs/hooks-reference.html#useimperativehandle)

有时候，我们可能不想将整个子组件暴露给父组件，而只是暴露出父组件需要的值或者方法，这样可以让代码更加明确。该 Hook 应该与forwardRef 结合使用，如下所示：

```react
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const Input = forwardRef((props, ref) => {
    // refs
    const inputRef = useRef(null);
    // 暴露方法或属性给父组件
    useImperativeHandle(ref, () => ({
        value: inputRef.current.value,
        message: '我是子组件的属性',
        sayHello: () => {
            console.log('我是子组件的方法');
        }
    }));
    // render
    return (
        <input ref={inputRef} defaultValue="2312321"/>
    )
});

export default Input;
```

然后在App中调用

```js
import React, { useRef } from 'react';
import Input from './components/Input';

const App = () => {
  // refs
  // 关键代码
  const inputRef = useRef(null);
  // event
  const handleButtonClick = () => {
    // 读取子组件的属性、方法
    console.log(inputRef.current.value);
    console.log(inputRef.current.message);
    inputRef.current.sayHello();
  }
  // render
  return (
    <div className="App">
      {/* 关键代码 */}
      <Input type="text" ref={inputRef} />
      <button type="button" onClick={handleButtonClick}>读取输入框的值</button>
    </div>
  );
}

export default App;
```

这里要注意的是，子组件Input中的useRef对象，只是用来获取input元素的，大家不要和父组件的useRef混淆了。

这个例子有一个问题，就是点击按钮式inputValue没有更新，并且如果我想让inputValue变化时能够实时在父组件中响应,可以使用 **回调Ref**。要想实时更新数据，首先子组件中需要监听inputchange事件，实时更新数据。

```react
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const Input = forwardRef((props, ref) => {
    // state
    const [value, setValue] = useState('');
    // refs
    const inputRef = useRef(null);
    // 暴露方法或属性给父组件
    useImperativeHandle(ref, () => ({
        value: inputRef.current.value,
        message: '我是子组件的属性',
        sayHello: () => {
            console.log('我是子组件的方法');
        }
    }));
    // events
    const handleChange = (ev) => {
        setValue(ev.target.value);
    }
    // render
    return (
        <input ref={inputRef}  value={value} onChange={handleChange} />
    )
});

export default Input;
```

然后父组件中如果需要实时的读取子组件数据，我们可以使用后续要讲到的useCallback。

```react
import React, { useState, useCallback } from 'react';
import Input from './components/Input';

const App = () => {
  // state
  const [value, setValue] = useState('');
  const inputEl = useCallback(node => {
    if (node != null) {
      // 每次子组件更新时都会触发，传回的node就是子组件暴露的属性和方法
      setValue(node.value)
    }
  })
  // render
  return (
    <div className="App">
      {/* 关键代码 */}
      <Input type="text" ref={inputEl} />
      <p>{value}</p>
    </div>
  );
}

export default App;

```

## 07. [useMemo](https://react.docschina.org/docs/hooks-reference.html#usememo)

在介绍这个hooks的作用之前，我们先来回顾一下react中的性能优化：

- shouldComponentUpdate：对比nextProps 和 props决定要不要更新
- class 组件：pureComponent 
- Function组件：memo

在 `hooks` 出来之后，函数组件中没有 `shouldComponentUpdate` 生命周期，我们无法通过判断前后状态来决定是否更新。`useEffect` 不再区分 `mount` `update` 两个状态，这意味着函数组件的每一次调用都会执行其内部的所有逻辑，那么会带来较大的性能损耗。

useMemo和后文讲到useCallback的都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数。

useMemo是在渲染期间执行的，而useEffect是在渲染之后执行。

对于这两块的性能优化，记住以下结论即可：

- 在子组件不需要父组件的值和函数的情况下，只需要使用 `memo` 函数包裹子组件即可。
- 如果有函数传递给子组件，使用 `useCallback`
- 如果有值传递给子组件，使用 `useMemo`
- `useEffect`、`useMemo`、`useCallback` 都是**自带闭包**的。也就是说，每一次组件的渲染，其都会捕获当前组件函数上下文中的状态(`state`, `props`)，所以每一次这三种hooks的执行，反映的也都是**当前的状态**，你无法使用它们来捕获上一次的状态。对于这种情况，我们应该使用 `ref` 来访问。

接下来通过一组示例了解useMemo的使用：

```react
import React, { useState } from 'react';

const Example = () => {
    const [count, setCount] = useState(1);
    const [value, setValue] = useState('');

    const getNum = () => {
        console.log('__计算结果__')
        return count + 1;
    }

    return <div>
        <h4>总和：{getNum()}</h4>
        <div>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <input value={value} onChange={ev => setValue(ev.target.value)} />
        </div>
    </div>;
}

export default Example;
```

上面这个组件，维护了两个state，可以看到getNum的计算仅仅跟count有关，但是现在无论是count还是value变化，都会导致getNum重新计算，所以这里我们希望value修改的时候，不需要再次计算，这种情况下我们可以使用useMemo。

```react
import React, { useState, useMemo } from 'react';

const Example = () => {
    const [count, setCount] = useState(1);
    const [value, setValue] = useState('');

    const getNum = useMemo(() => {
        console.log('__计算结果__')
        return count + 1;
    }, [count])

    return <div>
        <h4>总和：{getNum}</h4>
        <div>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <input value={value} onChange={ev => setValue(ev.target.value)} />
        </div>
    </div>;
}

export default Example;
```

## 08. [useCallback](https://react.docschina.org/docs/hooks-reference.html#usecallback) 

useCllback与useMemo类似，我们来看一组示例：

Child.jsx

```jsx
import React, { memo } from 'react';

const Child = props => {
    console.log('__render_Child__');
    return (
        <div className="child"}>{props.m}</div>
    )
}

export default memo(Child)
```

App.jsx

```jsx
import React, { useState } from 'react';
import Child from './components/Child';

const App = () => {
  // state
  const [m, setM] = useState(0);
  const [n, setN] = useState(0);

  // render
  return (
    <div className="app">
      <button
        type="button"
        onClick={() => { setN(n + 1) }}
      >
        Click N -- {n}
      </button>
      <button
        type="button"
        onClick={() => { setM(m + 1) }}
      >
        Click M -- {m}
      </button>
      <Child m={m} />
    </div>
  )
}

export default App;

```

上面这组示例我们可以看到，Child组件通过高阶组件memo进行优化，只有m属性变化时才会触发子组件的更新，但是有这样一种情况，那就是如果我要去监听子组件事件时，那我们会通过props传递一个事件处理函数给子组件，如下所示：

Child.jsx

```jsx
import React, { memo } from 'react';
import propTypes from 'prop-types';

const Child = props => {
    console.log('__render_Child__');
    return (
        <div className="child" onClick={props.click}>{props.m}</div>
    )
}

Child.propTypes = {
    click: propTypes.func
}
export default memo(Child)
```

App.jsx

```js
import React, { useState } from 'react';
import Child from './components/Child';

const App = () => {
  // state
  const [m, setM] = useState(0);
  const [n, setN] = useState(0);

  const handleClick = () => {
    console.log('click Child components.');
  }

  // render
  return (
    <div className="app">
      <button
        type="button"
        onClick={() => { setN(n + 1) }}
      >
        Click N -- {n}
      </button>
      <button
        type="button"
        onClick={() => { setM(m + 1) }}
      >
        Click M -- {m}
      </button>
      <Child m={m} click={handleClick} />
    </div>
  )
}

export default App;
```

这个时候我们修改n的值，你会发现控制台依旧会打印 ”\__render_child\__“，这是由于当我们修改n的值得时候，父组件被重新渲染，事件处理函数 ”handleClick“ 会被重新赋值，所以子组件也会被重新渲染，要解决这个问题，我们就可以使用 `useCallback` 函数了，具体使用如下：

```jsx
const handleClick = useCallback(() => {
    console.log('click Child components.');
}, []);
```

## 09. [useLayoutEffect](https://react.docschina.org/docs/hooks-reference.html#uselayouteffect)

大部分情况下，使用 useEffect 就可以帮我们处理组件的副作用，但是如果想要同步调用一些副作用，比如对 DOM 的操作，就需要使用 useLayoutEffect，useLayoutEffect 中的副作用会在 DOM 更新之后同步执行。

> 官方提示：
>
> 如果你正在将代码从 class 组件迁移到使用 Hook 的函数组件，则需要注意 useLayoutEffect 与 componentDidMount、componentDidUpdate 的调用阶段是一样的。但是，我们推荐你一开始先用 useEffect，只有当它出问题的时候再尝试使用 useLayoutEffect。

**# useLayoutEffect + useCllback**

我们知道：

`React.memo` 类似于 `React.PureComponent`，能对`props`做浅比较，防止组件无效的重复渲染。

`useCallback` 用于缓存 `inline` 函数，防止因属性更新时生成新的函数导致子组件重复渲染。

父组件中input值发生变化时，会导致Child重新render，使用`React.memo`可以可以解决。

```react
const Child = React.memo(() => {
    console.log("child") //只打印一次
    return (
        <div>
            <button >submit</button>
        </div>
    )
})
```

但是当Child组件接收父组件中的`onSubmit`函数，即使用了`React.memo`同样导致child重新渲染，

```jsx
const Child = React.memo(({ onSubmit }) => {
    console.log("child") //input变化时就打印
    return (
        <div>
            <button onClick={onSubmit}>submit</button>
        </div>
    )
})
```

因为input变化后，生成了新的`onSubmit`,`React.memo`认为是不同的`onSubmiit`，所以更新了
这时候，就要用到`useCallback`了。

```jsx
import React from "react"

const Child = React.memo(({ onSubmit }) => {
    console.log("child")
    return (
        <div>
            <button onClick={onSubmit}>submit</button>
        </div>
    )
})

const App = () => {
    const [text, setText] = React.useState("")

    // 方案一
    const onSubmit1 = React.useCallback(() => {
        console.log(text)
    }, []) //text是初始值，没有更新

    // 方案二
    const onSubmit2 = React.useCallback(() => {
        console.log(text)
    }) //text是新的，text变化时，生成了新的onSubmit2,表示只要有属性更新就执行

    // 方案三，等同于方案二
    const onSubmit3 = React.useCallback(() => {
        console.log(text)
    }, [text]) //text是新的，text变化时，生成了新的onSubmit2,表示text更新时执行

    // 方案四，达到了目的
    const ref = React.useRef()
    React.useLayoutEffect(() => {
        ref.current = text
    }, [text])
    const onSubmit4 = React.useCallback(() => {
        console.log(ref.current)
    }, [ref]) //ref只在创建时更新，其属性current跟随text变化，不会生成新的onSubmit4

    console.log("app")
    return (
        <div>
            <input value={text} onChange={e => setText(e.target.value)} />
            {/* Child组件使用了React.memo */}
            <Child onSubmit={onSubmit4} />
        </div>
    )
}

export default App

```

useCallback与memo搭配使用才能达到最优效果

## 10. [useDebugValue](https://react.docschina.org/docs/hooks-reference.html#usedebugvalue)

# 三、自定义Hook

目前为止，在 React 中有两种流行的方式来共享组件之间的状态逻辑: [render props](https://links.jianshu.com/go?to=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Frender-props.html) 和[高阶组件](https://links.jianshu.com/go?to=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Fhigher-order-components.html)，现在让我们来看看 Hook 是如何在让你不增加组件的情况下解决相同问题的。

```react
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// 自定义Hooks
const useSize = () => {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })
  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }, []);
  useEffect(() => {
    window.addEventListener('resize', onResize, false);
    return () => {
      window.removeEventListener('resize', onResize, false);
    }
  }, [])
  return size;
}

const Child = () => {
  const size = useSize();
  return (<p>Child: {size.width} x {size.height}</p>)
}

const App = () => {
  const size = useSize();
  return (
    <div className="App">
      <Child />
      <p>App: {size.width} x {size.height}</p>
    </div>
  )
}

export default App;
```

在两个组件中使用相同的 Hook 会共享 state 吗？不会。自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。

# 四、React Hooks 数据流

[参考这里 >>](https://juejin.im/post/5e8bd87851882573c66cfc68#heading-6)





























