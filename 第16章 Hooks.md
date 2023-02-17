# 一、概述

[React Hooks >>](https://zh-hans.reactjs.org/docs/hooks-intro.html) 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

```jsx
import React, { useState } from 'react';

const App: React.FC = () => {
  // -- state
  const [times, setTimes] = useState(0);
  // -- renders
  return (
    <div className='page'>
      <p>You Click the Button {times} times.</p>
      <button type='button' onClick={() => setTimes(times + 1)}>
        Tap me.
      </button>
    </div>
  );
};

export default App;
```

`useState` 是我们要学习的第一个 “Hook”，这个例子是简单演示。如果不理解也不用担心。

在我们继续之前，请记住 Hook 是：

- **完全可选的。** 你无需重写任何已有代码就可以在一些组件中尝试 Hook。但是如果你不想，你不必现在就去学习或使用 Hook。
- **100% 向后兼容的。** Hook 不包含任何破坏性改动。
- **现在可用。** Hook 已发布于 v16.8.0。

**👉 动机**

1）类组件状态逻辑复用难

- 缺少复用机制
- 渲染属性和高阶组件导致层级冗余

2）趋向复杂难以维护

- 生命周期函数混杂不相干逻辑
- 相干逻辑分散在不同生命周期

3）`this` 指向困扰

- 内联函数过度创新句柄
- 类成员函数不能保证this

**👉 优势**

- 函数组件无 `this` 问题；
- 自定义Hook方便复用状态逻辑；
- 副作用的关注点分离；

**👉 渐进策略**

**官方没有计划从 React 中移除 class**，所以，Hook 的使用完全是可选的。Hook 和现有代码可以同时工作，你可以渐进式地使用他们。

**👉 使用规则**

Hook 本质就是 JavaScript 函数，但是在使用它时需要遵循两条规则

- 只能在 **函数最顶层层** 调用 Hook，不要在 循环、条件判断 或 嵌套函数 中调用。
- 只能在 **React函数中** 中调用 Hook，不要在普通的 JavaScript 函数中调用。
  - ✅ 在 React 的函数组件中调用 Hook
  - ✅ 在自定义 Hook 中调用其他 Hook

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
import React, { useState } from 'react';

const Test: React.FC = () => {
  // -- state
  const [times, setTimes] = useState(0);
  // -- renders
  return (
    <div className='page'>
      <p>You Click the Button {times /** 读取State*/} times.</p>
      <button type='button' onClick={() => setTimes(times + 1) /** 更新State*/ }>
        Tap me.
      </button>
    </div>
  );
};

export default Test;
```

**👉 函数式更新**

如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 `setState`。

该函数将接收先前的 state，并返回一个更新后的值。

```jsx
<button onClick={() => setCount(prevTimes => prevTimes + 1)}>Tap me.</button>
```

如果你的更新函数返回值与当前 state 完全相同，则随后的重渲染会被完全跳过。

> 注意：
>
> 与类组件中的 `setState` 方法不同，`useState` 不会自动合并更新对象。你可以用函数式的 `setState` 结合展开运算符来达到合并更新对象的效果。
>
> ```jsx
> const [state, setState] = useState({});
> setState(prevState => {
>   	return {...prevState, ...updatedValues};
>   });
> ```

**👉 声明多个状态**

```tsx
const [times, setTimes] = useState(0);
const [name, setName] = useState('');
const [todos, setTodos] = useState([{ text: 'learns' }]);
```

**👉 惰性初始化**

`initialState` 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用：

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

## [useEffect](https://zh-hans.reactjs.org/docs/hooks-reference.html#useeffect) 

Effect Hook 可以让你在函数组件中执行副作用（数据获取，订阅或者手动修改DOM）操作。`useEffect` 就是一个 Effect Hook，它跟类组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API。

例如，下面这个组件在 React 更新 DOM 后会设置一个页面标题：

```jsx
import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  // -- state
  const [times, setTimes] = useState(0);
  // -- effects
  // -- 相当于 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    document.title = `You clicked ${times} times`;
  });
  // -- renders
  return (
    <div className='page'>
      <p>You Click the Button {times} times.</p>
      <button type='button' onClick={() => setTimes(times + 1)}>
        Tap me.
      </button>
    </div>
  );
};

export default App;
```

当你调用 `useEffect` 时，就是在告诉 React 在完成对 DOM 的更改后运行你的副作用函数。

由于副作用函数是在组件内声明的，所以它们可以访问到组件的 props 和 state。默认情况下，React 会在每次渲染后调用副作用函数 —— **包括**第一次渲染的时候。

**👉 清除辅佐**

副作用函数还可以通过返回一个函数来指定如何清除副作用，如：

```react
useEffect(() => {
  // -- 副作用操作（订阅、定时器...)
  return () => {
    // -- 清除副作用（移除订阅、定时器操作...）
  };
});
```

**👉 关注点分离**

React 允许使用多个 Effect 实现关注点分离。

```react
useEffect(() => {
  document.title = "Hello Hooks";
});
useEffect(() => {
  console.log(`Times：${Times}`);
});
```

**👉 条件执行**

默认情况下，Effect 会在每轮组件渲染完成后执行。这样的话，一旦 Effect 的依赖发生变化，它就会被重新创建。

通过传递第2个参数（它是 Effect 所依赖的值数组），可让其只在指定属性变化时重新创建。

```jsx
useEffect(() => {
  console.log(name);
}, [name]);
```

上述代码，会在 `name` 属性变化时才会触发Effect。

如果想执行  **只运行一次** 的 Effect（仅在组件挂载和卸载时执行），可以传递一个空数组作为第二个参数。

```tsx
useEffect(() => {
  $.ajax(); 
  document.title = 'Hello-Hooks';
}, []);
```

## [useContext](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext) 

```tsx
const value = useContext(AppContext);
```

接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定。

> **Tips：**
>
> - `useContext` 参数必须是 `context` 对象本身。
>
> - `useContext(AppContext)` 相当于 class 组件中的 `static contextType = AppContext` 或者 `<AppContext.Consumer>`

请看示例：

**`./src/context.ts`**

```tsx
import React from 'react';

interface ProviderProps {
  name: string;
  job: string;
}
export const AppContext = React.createContext<ProviderProps | null>(null);
```

**`./src/App.tsx`**

```tsx
import React from 'react';
import Test from 'src/views/Test';
import AppContext from './context';

const App: React.FC = () => {
  return (
    <AppContext.Provider value={{ name: '张三', job: '程序猿' }}>
      <div className='App'>
        <Test />
      </div>
    </AppContext.Provider>
  );
};

export default App;
```

**`./src/views/Test.js`**

```react
import React, { useContext } from 'react';
import { AppContext } from 'src/context';

const Test: React.FC = () => {
  // -- context
  const context = useContext(AppContext);
  return (
    <p>{context?.name} - {context?.job}</p>
  );
};
export default Test;
```

## [useReducer](https://zh-hans.reactjs.org/docs/hooks-reference.html#usestate) 

语法形式：

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

参数解读：

- `reducer`：更新state，格式为：`(state, action) => newState`
- `initialArg`：初始 state
- `init`：惰性初始 state

代码示例：

```react
type StateType = {
  name: string;
  age: number;
};
type ActionType =
  | { type: 'CHANGE_NAME'; payload: string }
  | { type: 'CHANGE_AGE'; payload: number };

const initialState: StateType = { name: '张三', age: 18 };
const reducer: React.Reducer<StateType, ActionType> = (state, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return { ...state, name: action.payload };
    case 'CHANGE_AGE':
      return { ...state, age: action.payload };
    default:
      return state;
  }
};

const Test: React.FC = () => {
  // -- refs
  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  // -- reducers
  const [state, dispatch] = useReducer(reducer, initialState);
  // -- events
  const onChangeName = () => {
    dispatch({ type: 'CHANGE_NAME', payload: nameInput.current?.value || '' });
  };
  const onChangeAge = () => {
    dispatch({ type: 'CHANGE_AGE', payload: ageInput.current ? parseInt(ageInput.current.value) : 0 });
  };
  // -- renders
  return (
    <div className='Test'>
      <div>{state.name} - {state.age} </div>

      <input ref={nameInput} />
      <button type='button' onClick={onChangeName}>修改姓名</button>
      <br />

      <input ref={ageInput} />
      <button type='button' onClick={onChangeAge}>修改年龄</button>
    </div>
  );
};
export default Test;
```

上述示例中，定义 action 类型过于繁琐，我们可以继续优化类型判断：

```typescript
// -- 定义一个生成 Action 类型的泛型
type ActionMap<M extends Record<string, any>> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

// -- 定义具体的 Action 类型
type PayloadType = {
  CHANGE_NAME: string;
  CHANGE_AGE: number;
};
type ActionType = ActionMap<PayloadType>[keyof ActionMap<PayloadType>];
```

我们定义了一个`ActionMap`泛型，该泛型会将传入的类型 `{key: value}` 生成为新的 `{key: {type: key, payload: value }` 类型。然后我们利用 `keyof` 关键字获取到所有的key，就可以得到我们所需要的`{ type: key1, payload: value1} | {type: key2, payload: value2}`的类型了。只要我们定义好`PayloadType`类型，则可以自动推导出我们需要的 `Actions` 类型。

**扩展功能**

useReducer，可以帮助我们集中式的处理复杂的 state 管理。但如果我们的页面很复杂，拆分成了多层多个组件，我们如何在子组件触发这些 state 变化呢？

我们可以结合 useContext 使用，将 dispatch 作为 <b><ins>value</ins></b> 属性传递给子组件即可。我们来看一组示例：

1）首先定义 store：*`src/store/index.ts`*

```tsx
// -- 定义一个生成「Action」类型的泛型
type ActionMap<M extends Record<string, any>> = {
  [K in keyof M]: M[K] extends undefined
    ? { type: K }
    : { type: K; payload: M[K] };
};

// -- 定义具体的Action类型
type PayloadType = {
  CHANGE_NAME: string;
  CHANGE_AGE: number;
};

export type ActionType = ActionMap<PayloadType>[keyof ActionMap<PayloadType>];
export type StateType = {
  name: string;
  age: number;
};

export const initialState: StateType = { name: '张三', age: 18 };
export const reducer: React.Reducer<StateType, ActionType> = (state,  action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return { ...state, name: action.payload };
    case 'CHANGE_AGE':
      return { ...state, age: action.payload };
    default:
      return state;
  }
};
```
2）创建一个Context上下文：*`src/context.ts`*

```jsx
import React from 'react';

import { StateType, ActionType } from 'src/store';

interface ProviderProps {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}
export const AppContext = React.createContext<ProviderProps>({} as ProviderProps);
```
3）在 *`App.tsx`*  中使用 useReducer，然后将 state & dispatch 通过上下文共享给子组件

```react
import React, { useReducer } from 'react';
import { initialState, reducer } from 'src/store';
import { AppContext } from 'src/context';
import Test from 'src/views/Test';
const App: React.FC = () => {
  // -- 解构state，dispatch
  const [state, dispatch] = useReducer(reducer, initialState);
  // -- 通过上下文将 state、dispatch 分发给子组件
  return (
    <AppContext.Provider value={{ state, dispatch }}>
    	<Test />
    </AppContext.Provider>
  );
};

export default App;
```
4）在子组件中通过 useContext 拿到 `state`、`dispatch` 使用

```react
import React, { useContext, useRef } from 'react';
import { AppContext } from 'src/context';

const Test: React.FC = () => {
  // -- refs
  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  // -- reducers
  const { state, dispatch } = useContext(AppContext);
  // -- events
  const onChangeName = () => {
    dispatch({ type: 'CHANGE_NAME', payload: nameInput.current?.value || '' });
  };
  const onChangeAge = () => {
    dispatch({type: 'CHANGE_AGE', payload: ageInput.current ? parseInt(ageInput.current.value) : 0});
  };
  // -- renders
  return (
    <div className='Test'>
      <div>{state.name} - {state.age}</div>

      <input ref={nameInput} />
      <button type='button' onClick={onChangeName}>
        修改姓名
      </button>
      <br />

      <input ref={ageInput} />
      <button type='button' onClick={onChangeAge}>
        修改年龄
      </button>
    </div>
  );
};
export default Test;
```

## [useMemo](https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo) & [useCallback](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecallback) 

在介绍这些 hooks 的作用之前，我们先来回顾一下React 中的性能优化（避免组件内重渲染）：

- shouldComponentUpdate：对比nextProps 和 props决定要不要更新
- class 组件：pureComponent 
- Function组件：memo

示例代码：

```jsx
import React, { useState } from 'react';

const Child: React.FC = () => {
  /** 当父组件更新时，触发重复打印  */
  console.log('__render_child__');
  return <></>;
};

const Parent: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Tap {count} times.
      </button>
      <Child />
    </div>
  );
};

export default Parent;
```

**1）memo**

`memo` 的使用对象为组件，且一般为某组件内的子组件，以上述代码为例，使用 `memo` 函数将 `Child` 包裹住，可以避免重复渲染

```jsx
const Child: React.FC = React.memo(() => {
  /** 当父组件更新时，不会触发重复打印  */
  console.log('__render_child__');
  return <></>;
});
```

**2）useCallback**

`memo` 缓存组件，`useCallback` 缓存函数，若把上述代码改为下面这样：

```tsx
import React, { useState } from 'react';

interface IProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const Child: React.FC<IProps> = React.memo((props) => {
  console.log('__render_child__');
  return <input onChange={props.onChange} />;
});

const Parent: React.FC = () => {
  // -- states
  const [text, setText] = useState('');
  // -- methods
  const onChange = ($event: React.ChangeEvent<HTMLInputElement>) => {
    setText($event.target.value);
  };
  // -- renders
  return (
    <div>
      <p>Text: {text} </p>
      <Child onChange={onChange} />
    </div>
  );
};

export default Parent;
```

在子组件中，引用了父组件的 `onChange`  方法，正常来说该方法是不便的，但是当触发 input-change 事件更新 `text` 值之后会触发父组件的重渲染，这样就导致 `onChange` 被重新创建，对于子组件而言，引用的就是一个新的 `onChange` 函数， 进而导致了子组件的重渲染。此时的优化就需有 `memo` 和 `useCallback` 配合使用啦。

```react
import React, { useState, useCallback } from 'react';

interface IProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const Child: React.FC<IProps> = React.memo((props) => {
  console.log('__render_child__');
  return <input onChange={props.onChange} />;
});

const Parent: React.FC = () => {
  // -- states
  const [text, setText] = useState('');
  // -- methods

  /* 优化前
  const onChange = ($event: React.ChangeEvent<HTMLInputElement>) => {
    setText($event.target.value);
  }*/

  const onChange = useCallback(
    ($event: React.ChangeEvent<HTMLInputElement>) => {
      setText($event.target.value);
    },
    []
  );

  // -- renders
  return (
    <div>
      <p>Text: {text} </p>
      <Child onChange={onChange} />
    </div>
  );
};

export default Parent;
```

**3）useMemo**

很多时候，我们需要在组件中计算数据，例如将数组组合到单个值，或者排序、过滤等。希望在其他状态发生变化时，不需要再重复 render。 `useMemo` 它与 `useCallback` 密切相关，但用于优化数据处理。它有相同的 API 来定义它所依赖的值。传入需要创建的函数和依赖项数组。 `useMemo` 只会在某个依赖项发生更改时重新计算 memoized 值。 此优化有助于避免在每个渲染上进行高开销的计算，如果没有提供依赖项数组，那么 `useMemo` 将会在每次渲染时重新计算新的值。

```jsx
onst memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

## [useRef](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref) 

1）获取子组件或者DOM节点的句柄

2）渲染周期之间共享数据的存储

**1）useRef**

```jsx
const ref = useRef(initialValue);
```

`useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数。返回的 ref 对象在组件的整个生命周期内持续存在。

```react
import React, { useRef } from 'react';
const App: React.FC = () => {
  // -- 创建 Ref
  const input = useRef<HTMLInputElement>(null);
  // -- events
  const onChange = () => {
    /** 访问 Ref */
    console.log(input.current?.value);
  };
  // -- renders
  return (
    <div>
      {/* 分发 Ref*/}
      <input ref={input} onChange={onChange} />
    </div>
  );
};
export default App;
```

**2）forwardRef**

如果上述示例中不是 `input` 标签，而是一个自定义组件应该如何处理呢？这个时候我们就需要使用到 `forwardRef` 啦。

```jsx
import React, { useRef } from 'react';

interface IProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const MyInput = React.forwardRef<HTMLInputElement, IProps>((props, ref) => {
  return <input ref={ref} onChange={props.onChange} />;
});

const App: React.FC = () => {
  // -- refs
  const input = useRef<HTMLInputElement>(null);
  // -- events
  const onChange = () => {
    console.log(input.current?.value);
  };
  // -- renders
  return (
    <div>
      <MyInput ref={input} onChange={onChange} />
    </div>
  );
};

export default App;
```

可以看到 `React.forwardRef` 接受一个渲染函数，其接收 `props` 和 `ref` 参数并返回一个 React 节点。这样我们就将父组件中创建的`ref` 转发进子组件，并赋值给子组件的 `input` 元素。

**3）数据共享**

我们刚刚讲到，useRef 可以实现渲染周期之间的共享数据的存储，我们来看如下示例：

```jsx
import React, { useEffect, useRef, useState } from 'react';
const App: React.FC = () => {
  // -- state
  const [count, setCount] = useState(5);
  // -- refs
  const timer = useRef<NodeJS.Timer>();
  // -- effects
  useEffect(() => {
    timer.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
  }, []);
  useEffect(() => {
    if (count === 0) {
      clearInterval(timer.current);
    }
  });
  // -- renders
  return <p>Current Count：{count}</p>;
};

export default App;
```

上面这个示例，我们使用 useRef 来记录 timer，使得可以正常清除，试想一下，如果我们使用一个变量保存会怎样呢？显示不会正常清除，因为组件在每次渲染时都会重新复制timer变量。

## [useImperativeHandle](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle)

```jsx
useImperativeHandle(ref, createHandle, [deps])
```

`useImperativeHandle` 可以让自定义组件通过 `ref` 属性，将内部属性暴露给父组件进行访问。因为是函数式组件，所以需要结合 `forwardRef` 一起使用。

```tsx
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

/** Component of Dialog. */
interface IProps {
  title: string;
  message: string;
}
export interface DialogRefs {
  value: string;
  msg: string;
  printSomething: () => void;
}
const Dialog = React.forwardRef<DialogRefs, IProps>((props, ref) => {
  // -- refs
  const [text] = useState('Oops!');
  // -- outs refs
  useImperativeHandle(
    ref,
    () => ({
      value: text /** 暴露状态 */,
      msg: 'Giving is a reward in itself.' /** 暴露常量 */,
      printSomething: () =>
        console.log('Nothing is impossible!') /** 暴露方法 */,
    }),
    [text] /** 依赖，当 text 变化时会重新计算 */
  );
  // -- renders
  return (
    <div className='dialog'>
      <h3>{props.title}</h3>
      <p>{props.message}</p>
    </div>
  );
});

/** Component of App. */
const App: React.FC = () => {
  // -- refs
  const ref = useRef<DialogRefs>(null);
  // -- effecs
  useEffect(() => {
    console.log(ref.current?.msg);
    console.log(ref.current?.value);
    ref.current?.printSomething();
  }, []);
  // -- renders
  return (
    <Dialog
      ref={ref}
      title={'Tips'}
      message={'All things come to those who wait.'}
    />
  );
};
export default App;
```

## [useLayoutEffect](https://zh-hans.reactjs.org/docs/hooks-reference.html#uselayouteffect)

其函数签名与 `useEffect` 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，`useLayoutEffect` 内部的更新计划将被同步刷新。



`useLayoutEffect` 与 `useEffect` 名字很像，用法也大致类似，但两者执行时机不同：

**👉 `useEffect` 回调函数的执行时期**

`useEffect` 为异步执行，执行时期为：

1. 触发状态更新（如：`setState`，`forceUpdate`）
2. 渲染（`render`）函数执行
3. 将更新渲染到页面上
4. 执行 `useEffect` 回调函数

**👉 `useLayoutEffect` 回调函数的执行时期**

1. 触发状态更新（如：`setState`，`forceUpdate`）

2. 渲染（`render`）函数执行

3. 同步执行 `useLayoutEffect` 回调函数 

   如果此函数中存在触发更新操作，如 `setState`，会放弃本阶段的页面渲染，先执行更新然后再统一进行渲染。

4. 将更新渲染到页面上

**👉 对比后得到两者区别 **

- 执行时期的区别，useEffect 回调是在更新渲染到页面以后异步执行，而 useLayoutEffect是在更新渲染到页面前同步执行。

  造成的影响是，useLayoutEffect 回调中如果有耗时操作会阻塞页面的渲染，造成性能问题。

- 两者中如果调用setState更新状态，都会再次执行render，区别是 useEffect 会进行两次页面更新渲染，useLayoutEffect只会执行最后一次页面更新渲染。所以，看到的结果是使用useEffect时候执行更新页面上会出现闪烁，而useLayoutEffect确不会

- useLayoutEffect 的执行时期 同 class组件生命周期 componentDidMount 和 componentDidUpdate

所以，得出的结论是，大多数的场景中都应该使用useEffect来实现我们的逻辑，仅仅在一些特殊情况，比如需要去监听同步更新状态防止页面闪动时才需要useLayoutEffect。

# 三、自定义Hook

目前为止，在 React 中有两种流行的方式来共享组件之间的状态逻辑: [render props](https://zh-hans.reactjs.org/docs/render-props.html) 和[高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html)，至 Hooks 出现之后，自定义 Hooks 成为了最关键的一环，它是抽离业务逻辑和UI逻辑，复用代码的关键，因此在使用上相对于其他hooks不易掌握，你可能在开发中经常会遇到以下问题：

1. 我该什么时候使用自定义hooks ❓

2. 使用自定hooks时应该传入什么参数，又返回出什么值❓
3. 什么使用自定义hooks，我的代码逻辑好像没有变简洁❓
4. ...

为了解决以上疑问，下面我会结合业务的实际场景，通过几个案例，来跟大家分享自定义hooks中的一些实践与经验。

## 案例一：Tabs组件

需求：有一个Tab选项和内容区，tab的切换，会改变tabId，需要重新拉取接口数据，用以展示不同的内容

### 类组件实现

我们先使用类组件实现一下，借以发现类组件中存在的一些问题：

```tsx
import React from 'react';

/********************
 ** Content：负责渲染
 ********************/
interface TabContentProps {
  loading: boolean;
  msg: string;
}
const Content: React.FC<TabContentProps> = (props) => {
  const { loading, msg } = props;
  return <p>{loading ? 'Loading...' : msg}</p>;
};

/********************
 ** ContentContainer：容器组件，负责处理数据逻辑
 ********************/
interface TabContainerProps {
  id: number;
}
interface TabContainerState {
  loading: boolean;
  msg: string;
}
class ContentContainer extends React.Component<
  TabContainerProps,
  TabContainerState
> {
  // -- constructor
  constructor(props: TabContainerProps) {
    super(props);
    this.state = {
      loading: true,
      msg: '',
    };
  }
  // -- methods
  load() {
    this.setState({ loading: true });
    setTimeout(() => {
      const msgs = ["This is 1'th message.","This is 2'th message.","This is 3'th message."];
      this.setState({
        loading: false,
        msg: msgs[this.props.id],
      });
    }, 1000);
  }

  // -- life circles
  componentDidMount(): void {
    this.load();
  }

  componentDidUpdate(
    prevProps: Readonly<TabContainerProps>,
    prevState: Readonly<TabContainerState>,
    snapshot?: any
  ): void {
    if (prevProps.id !== this.props.id) {
      this.load();
    }
  }
  // -- renders
  render(): React.ReactNode {
    return <Content msg={this.state.msg} loading={this.state.loading} />;
  }
}

/********************
 ** Tabs：负责切换
 ********************/
interface TabState {
  id: number;
}
class Tabs extends React.Component<any, TabState> {
  // -- constructor
  constructor(props: any) {
    super(props);
    this.state = { id: 0 };
  }
  // -- events
  onChange = (id: number) => {
    this.setState({ id });
  };
  // -- renders
  render(): React.ReactNode {
    return (
      <div className='tabs'>
        <div className='tab-navs'>
          <button onClick={() => this.onChange(0)}>BUTTON-1</button>
          <button onClick={() => this.onChange(1)}>BUTTON-2</button>
          <button onClick={() => this.onChange(2)}>BUTTON-3</button>
        </div>
        <div className='tab-contents'>
          <ContentContainer id={this.state.id} />
        </div>
      </div>
    );
  }
}

export default Tabs;
```

效果演示：

![](./IMGS/custom-hooks.gif)

我将这个功能抽成了三个组件：

- Tabs：负责切换Tab
- ContentContainer：负责处理数据/业务逻辑
- Content：负责渲染

为什么要这么拆分的原因：将包含业务逻辑的容器组件和UI展示部分的展示组件剥离开，利于代码的复用，详细可 [「参考」](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)。

原有的类组件模式，通常是将组件拆分为 「UI组件」 和 「容器组件」

容器组件部分处理数据逻辑，套在需要使用到该逻辑的组件上，从而达到复用代码逻辑的目的。 因此在处理 Content 的时候，我将其拆成了两个组件：

- 只负责渲染的 Content 组件

- 只负责逻辑处理的ContentCantainer组件

  > 为了复用，我们只能通过 props 的形式，做一层嵌套，像React中的高阶组件就是通过这种模式来实现代码逻辑的复用。

  > 但这种模式存在一定缺陷，组件非常复杂的时候，如果每次都通过嵌套拆分的模式来复用代码，会形成很深的组件层级和嵌套逻辑，这会给开发带来不少麻烦。而Hooks的出现就解决了这个问题

### Hooks改造

针对之前遇到的问题，我们使用Hooks进行改造：

```tsx
import React, { useEffect, useState } from 'react';

/********************
 ** 自定义Hooks：负责处理逻辑，将状态返回给外界组件
 ********************/
const useContent = (id: number) => {
  // -- state
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // -- effects
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const msgs = ["This is 1'th message.","This is 2'th message.","This is 3'th message."];
      setLoading(false);
      setMsg(msgs[id]);
    }, 1000);
  }, [id]);

  return [loading, msg];
};

/********************
 ** Content：UI组件，负责渲染
 ********************/
interface ContentProps {
  id: number;
}
const Content: React.FC<ContentProps> = (props) => {
  const [loading, msg] = useContent(props.id);
  return <p>{loading ? 'Loading...' : msg}</p>;
};

/********************
 ** Tabs：负责切换
 ********************/
const Tabs: React.FC = () => {
  // -- state
  const [id, setId] = useState(0);
  // -- renders
  return (
    <div className='tabs'>
      <div className='tab-navs'>
        <button onClick={() => setId(0)}>BUTTON-1</button>
        <button onClick={() => setId(1)}>BUTTON-2</button>
        <button onClick={() => setId(2)}>BUTTON-3</button>
      </div>
      <div className='tab-contents'>
        <Content id={id} />
      </div>
    </div>
  );
};

export default Tabs;
```

在类组件中，为了复用状态，我们将 Content 拆成了两个组件，并形成了嵌套。而在Hooks中，我们只使用了一个组件和一个自定义Hooks。

- useContent：自定义Hooks，负责处理逻辑，将状态返回给外界组件
- Content：UI组件，负责渲染

与Class不同的是，这两者并没有形成嵌套关系，而是扁平化，自定义的useContent，负责将组件逻辑抽了出来，只暴露给Content所需的状态。

## 案例二：Table组件

需求：实现一个表格组件，需要分页功能，切换不同页面时，加载不同的数据

为了方便案例展示，你可以先安装依赖：

```shell
$ npm install antd mockjs
```

### 常规实现

```tsx
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
const mockjs = require('mockjs');

interface DataSourceProps {
  id: string;
  name: string;
  age: string;
}
const List: React.FC = () => {
  // -- state
  const [dataSource, setDataSource] = useState<DataSourceProps[]>();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);

  // -- columns
  const columns: ColumnProps<DataSourceProps>[] = [
    { title: '姓名', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' },
  ];

  // -- methods
  const getDataSource = (current = 1) => {
    setLoading(true);
    setTimeout(() => {
      /** 模拟数据 */
      const data = mockjs.mock({'list|5': [{ id: '@guid', name: '@cname','age|18-50': 0}]});
      setDataSource(data.list as DataSourceProps[]);
      setTotal(14);
      setLoading(false);
    }, 1000);
  };
  // -- events
  const onChange = (cur: number) => {
    setCurrent(cur);
    getDataSource(cur);
  };
  // -- effects
  useEffect(() => {
    getDataSource();
  }, []);

  return (
    <Table
      loading={loading}
      rowKey={'id'}
      dataSource={dataSource}
      columns={columns}
      onChange={({ current }) => onChange(current || 1)}
      pagination={{ current, total, pageSize: 5, showSizeChanger: false }}
    />
  );
};

export default List;
```

在组件中我们不仅维护了Table组件的UI状态，也同时维护了Table组件的业务逻辑，定义了多个状态：

loading, dataSource , current, total

几乎每个表格组件都会包含上述的业务逻辑，此时我们就可以将业务逻辑使用Hooks的方式剥离出来，来实现复用的目的。

### Hooks改造

在编写 useTableHooks 的时候，我们需要注意两个地方

1. 需要将请求接口的函数作为参数传入Hooks中，且该函数需要约定固定的入参和返回值
   - 原因1：因为每个Table组件的网络请求都不一样，所以它是属于Table组件本身的逻辑，并不是useTableHooks 的逻辑，因此请求接口的函数需要在Table组件中定义
   - 原因2：约定固定参数和返回值是为了统一在hooks中处理数据
2. 监听表格切换的change函数，需要作为useTableHooks的返回值暴露出来，而不是在Table组件中监听change

平时在写业务逻辑的时候，我们较少的会使用这种写法（将函数作为参数传入，将函数作为返回值传出），因此对于这两个地方需要额外的注意。

**`src/views/Friends/useTableHooks.ts`**

```tsx
import { useEffect, useState } from 'react';
import { TablePaginationConfig } from 'antd/es/table';
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from 'antd/es/table/interface';


type FetchType<T> = (current: number) => Promise<{
  list: T[];
  total: number;
}>;

const useTableHooks = <T,>(fetch: FetchType<T>) => {
  // -- state
  const [dataSource, setDataSource] = useState<T[]>();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);

  // -- loadData
  const loadData = async (current = 1) => {
    setLoading(true);
    const { list, total } = await fetch(current);
    setDataSource(list);
    setTotal(total);
    setLoading(false);
  };
  // -- events
  const onChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: TableCurrentDataSource<T>
  ) => {
    setCurrent(pagination.current || 1);
    loadData(pagination.current || 1);
  };
  // -- effecs
  useEffect(() => {
    loadData();
  }, []);
  return {
    dataSource,
    onChange,
    current,
    loading,
    total,
  };
};
export default useTableHooks;
```

**`src/views/Friends/index.tsx`**

```tsx
import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import useTableHooks from './useTableHooks';

const mockjs = require('mockjs');

interface DataSourceProps {
  id: string;
  name: string;
  age: string;
}
interface Response {
  code: number;
  data: DataSourceProps[];
  total: number;
}
const Friends: React.FC = () => {
  // -- state
  const service = () => {
    return new Promise<Response>((resolve) => {
      setTimeout(() => {
        resolve(
          mockjs.mock({
            code: 0,
            'data|5': [{ id: '@guid', name: '@cname', 'age|18-50': 0 }],
            total: 20,
          })
        );
      }, 1000);
    });
  };
  const getDataSource = async (current: number) => {
    console.log('当前请求页码：', current);
    const { data, total } = await service();
    return {
      list: data,
      total,
    };
  };

  const { dataSource, onChange, current, loading, total } =
    useTableHooks<DataSourceProps>(getDataSource);

  // -- columns
  const columns: ColumnProps<DataSourceProps>[] = [
    { title: '姓名', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' },
  ];

  return (
    <Table
      loading={loading}
      rowKey={'id'}
      dataSource={dataSource}
      columns={columns}
      onChange={onChange}
      pagination={{ current, total, pageSize: 5, showSizeChanger: false }}
    />
  );
};

export default Friends;

```

可以看到通过自定义hooks的改造，成功的将UI逻辑和业务逻辑给分离开来，在其他地方再次使用到表格组件时，就可以直接使用 useTableHooks 去处理分页逻辑，整个组件变得就更加简洁可复用了。

## 总结

通过上面两个案例，我们可以回答最开始的几个问题了

1. 我该什么时候使用自定义Hooks？

   - 发现某处业务逻辑重复使用时，可将业务逻辑抽离开

   - 组件比较复杂时，可通过自定义Hooks拆分组件逻辑，简化代码
2. 使用自定hooks时应该传入什么参数，又返回出什么值？
     - 传参和返回值是比较灵活的，需要注意的是，不仅能传常规的数据类型，还能传递函数对象
3. 为什么时候自定义Hooks，我的代码好像没有变简洁？
     - 要理解UI组件和容器组件这两个概念
     - 恰当的抽离业务逻辑部分，保留组件的UI部分
     - 组件复杂时拆分可能也有一定的难度，过度设计会导致组件更难维护，因此要把控好度

# 四、React Hooks 数据流

[参考这里 >>](https://juejin.im/post/5e8bd87851882573c66cfc68#heading-6)

# 五、拓展

## 深入理解 useEffect & useLayoutEffect

我们先看下 React 官方文档对这两个 hook 的介绍，建立个整体认识：

> **`useEffect(effect, deps?)`**
>
> 该 Hook 接收一个包含命令式、且可能有副作用代码的函数。在函数组件主体内（这里指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性。使用 useEffect 完成副作用操作。赋值给 useEffect 的函数会**在组件渲染到屏幕之后执行**。你可以把 effect 看作从 React 的纯函数式世界通往命令式世界的逃生通道。

> **`useLayoutEffect(effect, deps?)`**
>
> 其函数签名与 useEffect 相同，但它**会在所有的 DOM 变更之后同步调用** effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

注意加粗的字段，React 官方的文档其实把两个 Hook 的执行时机说的很清楚，下面我们深入到 React 的执行流程中来理解下：

1. React 在 diff 后，会进入到 commit 阶段，准备把虚拟 DOM 发生的变化映射到真实 DOM 上

2. 在 commit 阶段的前期，会调用一些生命周期方法，对于类组件来说，需要触发组件的 getSnapshotBeforeUpdate 生命周期，对于函数组件，此时会调度 useEffect 的 create destroy 函数

3. 注意是调度，不是执行。在这个阶段，会把使用了 useEffect 组件产生的生命周期函数入列到 React 自己维护的调度队列中，给予一个普通的优先级，让这些生命周期函数异步执行

   ```tsx
   // 可以近似的认为，React 做了这样一步，实际流程中要复杂的多
   setTimeout(() => {
     const preDestory = element.destroy;
     if (!preDestory) prevDestroy();
     const destroy = create();
     element.destroy = destroy;
   }, 0);
   ```

4. 随后，就到了 React 把虚拟 DOM 设置到真实 DOM 上的阶段，这个阶段主要调用的函数是 commitWork，commitWork 函数会针对不同的 fiber 节点调用不同的 DOM 的修改方法，比如文本节点和元素节点的修改方法是不一样的。

5. commitWork 如果遇到了类组件的 fiber 节点，不会做任何操作，会直接 return，进行收尾工作，然后去处理下一个节点，这点很容易理解，类组件的 fiber 节点没有对应的真实 DOM 结构，所以就没有相关操作

6. 但在有了 hooks 以后，函数组件在这个阶段，会**同步调用**上一次渲染时 useLayoutEffect(effect, deps) create 函数返回的 destroy 函数

7. 注意一个节点在 commitWork 后，这个时候，我们已经把发生的变化映射到真实 DOM 上了

8. 但由于 JS 线程和浏览器渲染线程是互斥的，因为 JS 虚拟机还在运行，即使内存中的真实 DOM 已经变化，浏览器也没有立刻渲染到屏幕上

9. 此时会进行收尾工作，**同步执行**对应的生命周期方法，我们说的componentDidMount，componentDidUpdate 以及 useLayoutEffect(create, deps) 的 create 函数都是在这个阶段被**同步执行**。

10. 对于 react 来说，commit 阶段是不可打断的，会一次性把所有需要 commit 的节点全部 commit 完，至此 react 更新完毕，JS 停止执行

11. 浏览器把发生变化的 DOM 渲染到屏幕上，到此为止 react 仅用一次回流、重绘的代价，就把所有需要更新的 DOM 节点全部更新完成

12. 浏览器渲染完成后，浏览器通知 react 自己处于空闲阶段，react 开始执行自己调度队列中的任务，此时才开始执行 useEffect(create, deps) 的产生的函数

延伸问题：

**👉 useEffect 和 useLayoutEffect 的区别？**

- `useEffect` 在渲染时是 **异步执行**，并且要等到浏览器将所有变化渲染到屏幕后才会被执行。
- `useLayoutEffect` 在渲染时是 **同步执行**，其执行时机与 componentDidMount，componentDidUpdate 一致。



**👉  useEffect 和 useLayoutEffect 哪一个与 componentDidMount / componentDidUpdate 是等价的？**

- `useLayoutEffect`，因为从源码中调用的位置来看，`useLayoutEffect` 的 `create` 函数的调用位置、时机都和 componentDidMount，componentDidUpdate 一致，且都是被 React 同步调用，都会阻塞浏览器渲染。



**👉  useEffect 和 useLayoutEffect 哪一个与 componentWillUnmount 的是等价的？**

- 同上，`useLayoutEffect` 的 `detroy` 函数的调用位置、时机与 `componentWillUnmount` 一致，且都是同步调用。
- `useEffect` 的 `detroy` 函数从调用时机上来看，更像是 `componentDidUnmount` (注意React 中并没有这个生命周期函数)。



**👉  为什么建议将修改 DOM 的操作里放到 useLayoutEffect 里，而不是 useEffect？**

- 可以看到在流程9/10期间，DOM 已经被修改，但浏览器渲染线程依旧处于被阻塞阶段，所以还没有发生回流、重绘过程。由于内存中的 DOM 已经被修改，通过 `useLayoutEffect` 可以拿到最新的 DOM 节点，并且在此时对 DOM 进行样式上的修改，假设修改了元素的 height，这些修改会在步骤 11 和 React 做出的更改一起被一次性渲染到屏幕上，依旧只有一次回流、重绘的代价。
- 如果放在 `useEffect` 里，`useEffect` 的函数会**在组件渲染到屏幕之后执行**，此时对 DOM 进行修改，会触发浏览器再次进行回流、重绘，增加了性能上的损耗。





















