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

如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 `setState`。该函数将接收先前的 state，并返回一个更新后的值。

```js
setState(prevState => ({
	...prevState,
	...updatedValues
}))
```

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

可以看到React.forwardRef 接受一个渲染函数，其接收 props 和 ref 参数并返回一个 React 节点。
这样我们就将父组件中创建的`ref`转发进子组件，并赋值给子组件的input元素。

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

## 07. [useCallback](https://react.docschina.org/docs/hooks-reference.html#usecallback) 

在介绍这个hooks的作用之前，我们先来回顾一下react中的性能优化。在hooks诞生之前，如果组件包含内部state，我们都是基于class的形式来创建组件。当时我们也知道，react中，性能的优化点在于：

1. 调用setState，就会触发组件的重新渲染，无论前后的state是否不同
2. 父组件更新，子组件也会自动的更新

基于上面的两点，我们通常的解决方案是：使用immutable进行比较，在不相等的时候调用setState；在shouldComponentUpdate中判断前后的props和state，如果没有变化，则返回false来阻止更新。

在 `hooks` 出来之后，函数组件中没有 `shouldComponentUpdate` 生命周期，我们无法通过判断前后状态来决定是否更新。`useEffect` 不再区分 `mount` `update` 两个状态，这意味着函数组件的每一次调用都会执行其内部的所有逻辑，那么会带来较大的性能损耗。

useCallback和后文讲到的useMemo都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数。

对于这两块的性能优化，记住以下结论即可，具体用法可参考后续useMemo一节。

- 在子组件不需要父组件的值和函数的情况下，只需要使用 `memo` 函数包裹子组件即可。

- 如果有函数传递给子组件，使用 `useCallback`

- 如果有值传递给子组件，使用 `useMemo`

- `useEffect`、`useMemo`、`useCallback` 都是**自带闭包**的。也就是说，每一次组件的渲染，其都会捕获当前组件函数上下文中的状态(`state`, `props`)，所以每一次这三种hooks的执行，反映的也都是**当前的状态**，你无法使用它们来捕获上一次的状态。对于这种情况，我们应该使用 `ref` 来访问。

## 08. [useMemo](https://react.docschina.org/docs/hooks-reference.html#usememo)

在介绍useMemo之前，我们通过一组示例来了解 `React.memo()` 是什么。

父组件：

```react
import React, { useState } from 'react';
import Button from './components/Button'

const App = () => {
    const [count, setCount] = useState(0);
    return (
        <div className="app">
            <button type="button" onClick={() => { setCount(count + 1) }}>
              点击{count}次
        		</button>
            <br />
            <Button text="按钮组件" />
        </div>
    );
}


export default App;
```

子组件：

```react
import React from 'react';

const Button = props => {
    console.log('__render_button__');
    const { text } = props;
    return (
        <button type="button">{text}</button>
    )
}

export default Button;
```

熟悉react的同学可以很显然的看出，当我们点击父组件的按钮的时候，观察控制台输出，可以发现Button组件会重新渲染，这意味着一些不必要的内存消耗，接下来我们使用React.memo() 优化，只需修改子组件，如下所示：

```react
import React, { memo } from 'react';

const Button = props => {
    console.log('__render_button__');
    const { text } = props;
    return (
        <button type="button">{text}</button>
    )
}

export default memo(Button);
```

将Button组件通过memo包装之后，点击按钮再来观察控制台输出，你会发现Button组件并不会因为父组件的刷新而重新渲染。

接下来我们给Button组件添加点击事件，在父组件中监听，修改父组件代码如下：

```react
import React, { useState } from 'react';
import Button from './components/Button'

const App = () => {
  const [count, setCount] = useState(0);
  const handleButtonClick = () => {
    console.log('按钮组件点击事件触发!');
  }
  return (
    <div className="app">
      <button type="button" onClick={() => { setCount(count + 1) }}>点击{count}次</button>
      <br />
      <Button text="按钮组件" onButtonClick={handleButtonClick} />
    </div>
  );
}


export default App;
```

修改子组件代码如下：

```react
import React, { memo } from 'react';

const Button = props => {
    console.log('__render_button__');
    const { text } = props;
    const { onButtonClick } = props;
    return (
        <button type="button" onClick={onButtonClick}>{text}</button>
    )
}

export default memo(Button);
```

当我们点击父组件的按钮修改count值时，观察控制台输出，发现Button组件每次都会随着父组件的更新而重新渲染，这是由于子组件依赖于父组件的监听函数，每次父组件被渲染时，都会重新定义该函数，name如何解决这个问题呢？我们可以使用useCallback，修改父组件代码如下：

```react
import React, { useState, useCallback } from 'react';
import Button from './components/Button'

const App = () => {
  const [count, setCount] = useState(0);
  const handleButtonClick = useCallback(() => {
    console.log('按钮组件点击事件触发!');
  }, []);
  return (
    <div className="app">
      <button type="button" onClick={() => { setCount(count + 1) }}>点击{count}次</button>
      <br />
      <Button text="按钮组件" onButtonClick={handleButtonClick} />
    </div>
  );
}

export default App;
```

此时点击按钮，Button组件将不会被渲染啦。

现在我们切入正题，了解useMemo的用法，还是从一组示例开始：

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

# 四、React Hooks 数据流

参考地址：https://juejin.im/post/5e8bd87851882573c66cfc68#heading-6































