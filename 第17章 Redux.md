# 一、概览

React 的外部状态管理库一直以来是 React 生态中非常内卷的一个领域。目前比较常见的状态管理库有 Redux（包括基于 Redux 的 Dva、Icestore）、Mobx、Zustand、Recoil、Jotai、Valtio、Hox 等。

综合 [npmtrends >>](https://npmtrends.com/hox-vs-jotai-vs-mobx-vs-recoil-vs-redux-vs-valtio-vs-zustand) 上近一年各个库在npm上的下载量来看，Redux 属于比较受欢迎的一个库，所以这里呢，也主要是讲解 Redux 的使用。

## Redux 是什么❓

[Redux >>](https://cn.redux.js.org/) 是 JavaScript 应用的状态容器，提供可预测的状态管理（数据流管理）。

> 摘自官网：***Redux 是一个使用叫做 “action” 的事件来管理和更新应用状态的模式和工具库** 它以集中式 Store（centralized store）的方式对整个应用中使用的状态进行集中管理，其规则确保状态只能以可预测的方式更新。*

## 为什么要使用 Redux❓

Redux 帮你管理 “**全局**” 状态 - 应用程序中的很多组件都需要的状态。

**Redux 提供的模式和工具使你更容易理解应用程序中的状态何时、何地、为什么、state 如何被更新，以及当这些更改发生时你的应用程序逻辑将如何表现**. Redux 指导你编写可预测和可测试的代码，这有助于你确信你的应用程序将按预期工作。

## 我什么时候应该使用 Redux❓

Redux 可帮助你处理共享状态的管理，但与任何工具一样，它也需要权衡利弊。使用 Redux 有更多的概念需要学习，还有更多的代码需要编写，需要添加一些额外代码，并要求你遵循某些限制。这是短期和长期生产力之间的权衡。

在以下情况下使用 Redux：

- 应用中有很多 state 在多个组件中需要使用
- 应用 state 会随着时间的推移而频繁更新
- 更新 state 的逻辑很复杂
- 中型和大型代码量的应用，很多人协同开发

> **注意：并非所有应用程序都需要 Redux。**

## Redux 库和工具有哪些❓

Redux 是一个小型的独立 JS 库。 但是，它通常与其他几个包一起使用：

- **React-Redux**

  Redux 可以集成到任何的 UI 框架中，其中最常见的是 React 。[**React-Redux**](https://cn.react-redux.js.org/) 是官方包，它可以让 React 组件访问 state 片段和 dispatch actions 更新 store，从而同 Redux 集成起来。

- **Redux Toolkit**

  [**Redux Toolkit**](https://cn.redux-toolkit.js.org/) 是官方推荐的编写 Redux 逻辑的方法。 它包含对于构建 Redux 应用程序必不可少的包和函数。 Redux Toolkit 简化了大多数 Redux 任务，预防了常见错误，并使编写 Redux 应用程序变得更加容易。
  
- **Redux DevTools** 

  [**Redux DevTools 扩展**](https://github.com/zalmoxisus/redux-devtools-extension) 可以显示 Redux 存储中状态随时间变化的历史记录。这允许你有效地调试应用程序，包括使用强大的技术，如“时间旅行调试”。

# 二、相关概念

## 👉 不可变性

"Mutable" 意为 "可改变的"，而 "immutable" 意为永不可改变。

JavaScript 的对象和数组默认都是 mutable 的。以对象为例，如果我创建一个对象，我可以更改其字段的内容。

```typescript
const object = {
  name: '张三',
  car: {
    brand: '东风本田·思域',
    color: '珍珠白',
  }
};
// -- 对外仍然还是那个对象，但它的内容已经变了
object.car.color = '炫动蓝'; 
```

这就是 **改变** 对象或数组的例子。内存中还是原来对象或数组的引用，但里面的内容变化了。

**如果想要不可变的方式来更新，代码必需先复制原来的对象，然后更新它的复制体**。通过展开运算符可方便实现这个目的：

```typescript
const newObject = {
  ...object,
  car: {
    ...object.car,
    color: '炫动蓝',
  },
};
```

**Redux 期望所有状态更新都是使用不可变的方式**。

> **提示：**当我们通过 Redux Toolkit 来构建 Redux 的时候，允许我们在 reducers 写 "可变" 逻辑，但这并不是真正的改变 state， 因为它使用了 immer 库，当 immer 检测到 "draft state" 改变时，会基于这些改变去创建一个新的不可变的 state

## 👉 单向数据流

我们知道在 React 中数据是单向流动的。所谓数据单向流动，就是说数据是从某一个点流向另一个点的（自上而下）。

我们假设数据中心是一个负责发行身份证的地方政府，每个人都可以到这里来领取自己的身份证，但是如果你对自己的身份证头像不满意，你不能自己去村口拍个十块钱的大头贴贴上去，也不能自己修改上面的个人信息，这样的身份证是不被承认的（弄不好可能还得坐牢），正确的操作方式应该是，带着你的修改意见，去到地方政府，找相关工作人员帮你重新办理，办理完之后再发放给你。

这个例子当中，数据中心我们视为父组件，身份证就是子组件通过父组件接收到的props，你不能直接修改自己的身份证，也就是你不能直接修改父组件传递过来的props，比如 **`this.props.name = '李好帅'`**，只能通知父组件去修改这个props，即调用父组件提供的 **`changeName`** 方法来操作，比如 **`this.props.changeName('李好帅')`**，这个过程事实上是修改了父组件的state，从而使得子元素接收到的数据也发生了改变。

所以数据由始至终都是从父元素流向子元素，我们称为**数据单向流动**。

我们回想一下我们之前构建过的所有 React应用，数据都是由最顶层父组件（页面组件）一层层向下传递的。

这也是深层次的组件之间通讯困难的原因：数据的传递是单向的，子组件的数据只能就近获取，但是真正的数据源却离得太远，没有捷径可以直接通知数据源更新状态（实际上，我们可以通过上下文 `context` 实现）。

Redux 的出现改变了React 的这种窘迫处境，它提供了整个应用的唯一数据源 store，这个数据源是随处可以访问的，不需要靠父子相传，并且还提供了（间接）更新这个数据源的方法，并且是随处可使用的！

## 👉 Redux 数据流

刚刚，我们谈到了“单向数据流”，现在我们来聊聊 Redux 的数据流。

具体来说，对于 Redux，我们可以将这些步骤分解为更详细的内容：

- 初始启动：
  - 使用最顶层的 root reducer 函数创建 Redux store
  - store 调用一次 root reducer，并将返回值保存为它的初始 `state`
  - 当 UI 首次渲染时，UI 组件访问 Redux store 的当前 state，并使用该数据来决定要呈现的内容。同时监听 store 的更新，以便他们可以知道 state 是否已更改。
- 更新环节：
  - 应用程序中发生了某些事情，例如用户单击按钮
  - dispatch 一个 action 到 Redux store，例如 `dispatch({type: 'counter/increment'})`
  - store 用之前的 `state` 和当前的 `action` 再次运行 reducer 函数，并将返回值保存为新的 `state`
  - store 通知所有订阅过的 UI，通知它们 store 发生更新
  - 每个订阅过 store 数据的 UI 组件都会检查它们需要的 state 部分是否被更新。
  - 发现数据被更新的每个组件都强制使用新数据重新渲染，紧接着更新网页

动画的方式来表达数据流更新：

<img src="./IMGs/ReduxDataFlowDiagram.gif" style="zoom: 33%;" />



# 三、三大原则

1. 单一数据源

2. State 是只读的 

3. 使用 reducer 纯函数进行更改

应用的整体全局状态以对象树的方式存放于单个 *store*。 唯一改变状态树（state tree）的方法是创建 *action*，一个描述发生了什么的对象，并将其 *dispatch* 给 store。 要指定状态树如何响应 action 来进行更新，你可以编写纯 *reducer* 函数，这些函数根据旧 state 和 action 来计算新 state。

# 四、Redux 术语

## 1. Actions

**Action** 是一个用于描述已发生事件的 **普通 JavaScript 对象**。简单来说，就是 “你干了一件什么事情”。但是单单讲了你干的事情，我们并不知道你干的这件事产生了什么牛逼效果，于是有了一个专门负责描述某个action 对应产生某种效果的机构，叫做 Reducer。

我们约定，action 的类型如下所示：

```typescript
interface PayloadAction<T = any> {
  type: string;
  payload: T;
}
```

语法解读：

- `type`：表示将要执行的动作，比如 `todos/todoAdded`，我们通常把那个类型的字符串写成 「**域/事件名称**」的形式，其中第一部分是这个 action 所属的特征或类别，第二部分是发生的具体事情。
- `payload`：所需的参数，比如  `todos/todoAdded` 表示添加一个待办事项，那待办事项的具体内容可以通过 payload 传递。

一个典型的 action 对象可能如下所示：

```js
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Learn to program.'
}
```

**👉 Action-Creators**

 Action-Creators 是一个创建并返回一个 action 对象的函数，它的作用是让你不必每次都手动编写 action 对象：

```typescript
export const todoAdded = (todoText: string) => ({
  type: 'todos/todoAdded',
  payload: todoText,
});
```

## 2. Reducers

**Reducer** 是一个接收当前的 `state` 和 `action`，必要时决定如何更新状态，并返回新的状态的纯函数，函数的签名是：

```tsx
(state, action) => newState
```

你可以将 Reducer 视为一个事件监听器，它根据接收到的 action（事件）类型处理事件。

Reducer 必需符合以下规则：

- 仅使用 `state` 和 `action` 参数计算新的状态值。
- 禁止直接修改 `state`。必须通过复制现有的 `state` 并对复制的值进行更改的方式来做 **不可变更新**。
- 禁止任何异步逻辑、依赖随机值或导致其他“副作用”的代码。

Reducer 函数内部的逻辑通常遵循以下步骤：

- 检查 reducer 是否关心这个 action
  - 如果是，则复制 state，使用新值更新 state 副本，然后返回新 state
- 否则，返回原来的 state 不变

## 3. Store

[**store**](https://cn.redux.js.org/api/store) 是 Redux 提供的 **唯一** 数据源，它存储了整个应用的状态。store 是通过传入一个 reducer 来创建的，如下所示：

```typescript
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore({ reducer: counterReducer });
console.log(store.getState()); // → {value: 0}
```

Store 有以下职责：

- 在内部保存当前应用程序 state
- 通过 [`store.getState()`](https://cn.redux.js.org/api/store#getState) 访问当前 state;
- 通过 [`store.dispatch(action)`](https://cn.redux.js.org/api/store#dispatch) 更新状态;
- 通过 [`store.subscribe(listener)`](https://cn.redux.js.org/api/store#subscribe) 注册监听器回调;
- 通过 [`store.subscribe(listener)`](https://cn.redux.js.org/api/store#subscribe) 返回的 `unsubscribe` 函数注销监听器。

> 注意：store是只读的，Redux 没有提供直接修改数据的方法，改变state的唯一方法就是触发（**dispatch**） **action** 。

## 4. Dispatch

Redux store 有一个方法叫 `dispatch`。**更新 state 的唯一方法是调用 `store.dispatch()` 并传入一个 action 对象**。store 将执行所有 reducer 函数并计算出更新后的 state，调用 `getState()` 可以获取新 state。

```typescript
store.dispatch({ type: 'counter/increment' });
console.log(store.getState()); // → {value: 1}
```

**dispatch 一个 action 可以形象的理解为 "触发一个事件"**。发生了一些事情，我们希望 store 知道这件事。 Reducer 就像事件监听器一样，当它们收到关注的 action 后，它就会更新 state 作为响应。

们通常调用 action creator 来调用 action：

```typescript
const increment = () => ({
  type: 'counter/increment'
});
store.dispatch(increment());
console.log(store.getState()); // → {value: 2}
```

## 5. Selectors

**Selector** 函数允许我们从 state 中读取数据，如下所示：

```typescript
// → xxxSlice.ts
export const selectCount = (state: RootState) => state.counter.value;
```

在组件中，我们可以这样访问：

```tsx
import { useSelector } from 'react-redux';
const count = useSelector(selectCount);
```

也可以在使用的地方以内联的方式定义：

```typescript
const count = useSelector((state: RootState) => state.counter.value)
```

## 6. Redux Slice

**👉  [Redux-Toolkit >>](https://cn.redux-toolkit.js.org/)**

**“Slice” 是应用中单个功能的 Redux-Reducer 逻辑和 action 的集合**，通常一起定义在一个文件中。该名称来自于将根 Redux 状态对象拆分为多个状态 “slice”。

比如，在一个博客应用中，store 的配置大致长这样：

```typescript
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/store/slices/usersSlice'
import postsReducer from '@/store/slices/postsSlice'
import commentsReducer from '@/store/slices/commentsSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer
  }
})
```

例子中，`state.users`，`state.posts`，和 `state.comments` 均是 Redux state 的一个 独立的 “slice”。由于 `usersReducer` 负责更新 `state.users` slice，我们将其称为 “slice reducer” 函数。

## 7. Thunk Functions

Redux store 本身无法处理异步逻辑。它只会同步地 dispatch action，并通过调用根 reducer 函数来更新 state，然后通知视图更新。而Reducer 是一个纯函数，禁止一切 **副作用** 操作，任何异步都必须在 store 之外发生。但是，我们的应用程序通常具有异步逻辑，比如从 API 请求数据之类的事情，为了解决这个问题，就需要一个地方专门处理异步逻辑，**中间件** 就是用来放这些副作用逻辑代码的地方。

Reudx 异步操作经历了三个阶段：`Redux Middlewares` → `redux-chunk` → `Redux Toolkit`

下面我们将逐一说明各阶段的用法。

### Middlewares

下面是几个示例，用来说明 middleware 如何使我们能够编写与 Redux store 交互的异步逻辑。

一个契机是编写 middleware 来查找特定的 action type，并在执行这些 action 时运行异步逻辑，例如以下示例：

```typescript
import { client } from '@/api/client'
// → Examples 1
const delayedActionMiddleware = storeAPI => next => action => {
  if (action.type === 'todos/todoAdded') {
    setTimeout(() => {
      // -- 将这个 action 延迟1秒执行
      next(action)
    }, 1000)
    return
  }
  return next(action)
}
// → Exmaples 2
const fetchTodosMiddleware = storeAPI => next => action => {
  if (action.type === 'todos/fetchTodos') {
    // -- 发送 API 从服务器获取 todos
    client.get('todos').then(todos => {
      // -- 使用获取到的 todos 数据来 dispatch 一个 action
      storeAPI.dispatch({ type: 'todos/todosLoaded', payload: todos })
    })
  }
  return next(action)
}
```

试想一下，如果我们的项目有若干个异步处理，那我们就需要编写若干个中间，如果有办法可以提前编写 任何 异步逻辑，不但与 middleware 本身分开，而且仍然可以访问 `dispatch` 和 `getState` 来和 store 进行交互，那就太好了。

**假设我们实现这样的 middleware，它可以传递 函数 给 dispatch，而不是 action 对象呢？**可以让这个 middleware 判断 action 是否为函数，如果是函数，就立即调用。这样就可以在 middleware 定义之外的其他函数中编写异步逻辑了。

middleware 看起来像这样：

```typescript
import { Middleware } from 'redux';
export const asyncMiddleware: Middleware = (storeApi) => (next) => (action) => {
  if (typeof action === 'function') {
    // → 如果传入的action是一个函数
    // → 调用该函数并传入 dispatch 和 getState 作为参数
    return action(storeApi.dispatch, storeApi.getState);
  } else {
    // → 否则，它就是一个普通 action，那就继续执行
    return next(action);
  }
};
```
然后就可以像这样使用该 middleware：

```typescript
// 👉 代码片段1：注册中间件
const store = createStore(rootReducer, applyMiddleware(asyncMiddleware) /* 注册中间件*/);

// 👉 代码片段2：编写一个接收 dispatch 和 getState 作为参数的函数
const fetchSomeData = (dispatch, getState) => {
  client.get('todos').then(todos => { // → 发送一个异步 HTTP 请求
    // → 使用获取的 todos 来 dispatch action
    dispatch({ type: 'todos/todosLoaded', payload: todos })
    // → dispatch 后检查更新后的 store
    const allTodos = getState().todos
    console.log('Number of todos after loading: ', allTodos.length)
  })
}

// 👉 代码片段3：向 dispatch 传入函数
store.dispatch(fetchSomeData);
```

> **注意：** **这个异步函数 middleware 使得我们可以给 `dispatch` 传入函数 ！**在该函数中，可以编写一些异步逻辑（比如 HTTP 请求），然后在请求完成后 dispatch 一个普通的 action。

### Redux-thunk

目前，Redux 已经有了异步函数 middleware 的正式版本，称为 [**Redux “Thunk” middleware**](https://github.com/reduxjs/redux-thunk)。thunk middleware 允许我们编写以 `dispatch` 和 `getState` 作为参数的函数。thunk 函数可以包含我们想要的任何异步逻辑，并且该逻辑可以根据需要 dispatch action 以及读取 store state。

**thunk** 是一种特定类型的 Redux 函数，可以包含异步逻辑。上一小节中的 `fetchSomeData` 函数就是一个 Thunk.

实际应用中， Thunk 是使用两个函数编写的：

- 一个内部 thunk 函数，它以 `dispatch` 和 `getState` 作为参数 → *真正的Thunk函数*
- 外部创建者函数，它创建并返回 thunk 函数 → *通过外部创建函数，可以实现参数的传递*

我们来看一个例子：

```typescript
export const incrementAsync = (amount) => async (dispatch, getState) => {
  console.log('Loading...');
  // → 模拟异步操作
  const data = await new Promise((resolve) => {
    setTimeout(() => resolve(amount + 1), 2000);
  });
  // → 当异步代码执行完毕时，可以 dispatched actions
  dispatch({ type: 'counter/incrementByAmount', payload: data });
  console.log('completed!');
};
// → 我们可以像使用普通 Redux action creator 一样使用它们
store.dispatch(incrementAsync(10));
```

当你需要请求后端服务时，你可以将该调用放入 thunk 中。这是一个写得有点长的例子，所以你可以看到它是如何定义的：

```typescript
// →  外部的 thunk creator 函数
function fetchUserById(userId: string) {
  // →  内部的 thunk 函数
  return async function (dispatch: Dispatch) {
    try {
      // →  thunk 内发起异步数据请求
      const user = await userAPI.fetchById(userId);
      // →  数据响应完成后 dispatch 一个 action
      dispatch(userLoaded(user));
    } catch (err) {
      // → 如果过程出错，在这里处理
    }
  };
}
```

**👉 配置Store**

Redux thunk middleware 在 NPM 上作为一个名为 redux-thunk 的包提供。需要安装该软件包后才能在应用程序中使用：

```shell
$ npm install redux-thunk
```

安装后，我们可以在 Redux store 中使用该 middleware：

```typescript
import { AnyAction, applyMiddleware, createStore } from 'redux';
import { rootReducer } from './reducers';
import thunkMiddleware from 'redux-thunk';
import type { ThunkAction, ThunkMiddleware } from 'redux-thunk';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware as ThunkMiddleware) /* 注册中间件*/
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export default store;
```

# 六、React-Redux（了解）

## Use-in-js

![](./IMGs/redux_basics.gif)

我们首先通过 Counter 示例帮助大家了解 Redux 在 JavaScript 中的应用。

### 1. 创建项目

```shell
$ mkdir redux-basics && cd redux-basics && touch index.css index.html index.js && code .
```

### 2. 编写代码

**👉  ` index.js`**

```javascript
// 👉 Get DOMs
const $ = (sel) => document.querySelector(sel);

// 👉 Actions creators
const increment = () => ({ type: 'counter/increment' });
const decrement = () => ({ type: 'counter/decrement' });
const incrementByAmount = (amount) => ({
  type: 'counter/incrementByAmount',
  payload: amount,
});
const toggleStatus = () => ({ type: 'status/toggleStatus' });

// 👉 Reduers
const counterReducer = (state = { count: 6 }, action) => {
  switch (action.type) {
    case 'counter/increment':
      return { ...state, count: state.count + 1 };
    case 'counter/decrement':
      return { ...state, count: state.count - 1 };
    case 'counter/incrementByAmount':
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
};
const statusReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case 'status/toggleStatus':
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
};

// 👉 Middlewares - 中间件
// -- 触发流程：dispatch → 中间件 → reducers
// -- 中间件使得我们可以在Redux中进行副作用操作
// -- 通常你不必单独为某一个功能构建中间件，而是创建一个统一的异步中间件来处理项目中的异步操作
// -- 使用时你需要先申请中间件增强器，然后在创建store的时候传入，如下所示：
// -- 1. const middlewareEnhancer = Redux.applyMiddleware(xxxMiddleware)
// -- 2. const store = Redux.createStore(reducer, middlewareEnhancer)
const asyncFunctionMiddleware = (storeApi) => (next) => (action) => {
  if (typeof action === 'function') {
    // → 如果传入的action是一个函数
    // → 调用该函数并传入 dispatch 和 getState 作为参数
    return action(storeApi.dispatch, storeApi.getState);
  } else {
    // → 否则，它就是一个普通 action，那就继续执行
    return next(action);
  }
};

// 👉 Create store
// → 注册中间件
const middlewareEnhancer = Redux.applyMiddleware(asyncFunctionMiddleware);
// → 合并reducers
const reducer = Redux.combineReducers({
  counter: counterReducer,
  status: statusReducer,
});
const store = Redux.createStore(reducer, middlewareEnhancer);

// 👉 Selectors
const useSelector = (fn) => {
  return fn(store.getState());
};

//  👉 CHUNKs - 异步函数
const incrementAsync = (amount) => async (dispatch, getState) => {
  const isLoading = getState().status.loading;
  if (isLoading) {
    return console.log('当前正在执行异步操作，请稍后再试...');
  }
  dispatch(toggleStatus());
  await new Promise((resolve) => {
    console.log('Loading...');
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  dispatch(toggleStatus());
  dispatch(incrementByAmount(amount));
  console.log('Completed!');
};

// 👉 Render functions
const render = () => {
  const count = useSelector((state) => state.counter.count);
  $('#value').textContent = count;
};
// → 订阅Store更新
store.subscribe(render);

// 👉 Events - Dispatchs
$('#increment').onclick = () => store.dispatch(increment());
$('#decrement').onclick = () => store.dispatch(decrement());
$('#addAmount').onclick = () => {
  const value = $('#textbox').value;
  store.dispatch(incrementByAmount(Number(value) || 0));
};
$('#asyncButton').onclick = () => {
  const value = $('#textbox').value;
  store.dispatch(incrementAsync(Number(value) || 0));
};

// 👉 Enter Actions...
$('#textbox').value = 2;
render();
```

**👉  ` index.html`**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./index.css" />
    <title>Redux basic example</title>
    <script src="https://unpkg.com/redux@latest/dist/redux.min.js"></script>
  </head>
  <body>
    <div class="app">
      <div class="row">
        <button class="button" id="increment">+</button>
        <span class="value" id="value">0</span>
        <button class="button" id="decrement">-</button>
      </div>
      <div class="row">
        <input class="textbox" id="textbox" />
        <button class="button" id="addAmount">Add Amount</button>
        <button class="button asyncButton" id="asyncButton">Add Async</button>
      </div>
    </div>
    <script src="./index.js"></script>
  </body>
</html>
```

**👉  ` index.css`**

```css
.app { height: 100vh; padding-top: 100px; }

.row { display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.button {
  font-size: 32px;
  padding: 4px 12px;
  border: 2px solid transparent;
  color: rgb(112, 76, 182);
  cursor: pointer;
  background-color: rgba(112, 76, 182, 0.1);
  border-radius: 10px;
  transition: all 0.15s;
}

.button:hover,
.button:focus  { border: 2px solid rgba(112, 76, 182, 0.4); }
.button:active { background-color: rgba(112, 76, 182, 0.2); }

.value { font-size: 78px; padding: 0 16px; font-family: 'Courier New', Courier, monospace; }

.textbox {
  font-size: 32px;
  padding: 4px;
  width: 64px;
  text-align: center;
  margin-right: 8px;
  border-radius: 10px;
}

.asyncButton { position: relative; margin-left: 8px; overflow: hidden; }
.asyncButton:after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(112, 76, 182, 0.15);
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  transition: width 1s linear, opacity 0.5s ease 1s;
}
.asyncButton:active:after { width: 0%; opacity: 1; transition: 0s; }
```

## Use-in-React-Class

### 前置知识

在 React 中使用 Redux，主要基于 `react-redux` 库实现。在开始之前，我们先了解一下关于 React-Class-Component 相关的知识。

> *提示：现如今，Hooks 盛行，基本上我现在开发的项目都是基于 React-Hooks + TypeScript 实现的，但你仍然有必要去了解Class中的使用，不说别的，至少面试的时候面试官可能会问你。*

#### 容器组件 & 展示组件

React-Redux 将所有组件分成两大类：容器组件 / 展示组件。

**👉 展示组件**

展示组件有以下几个特征：

1. 只负责 UI 的呈现，不带有任何业务逻辑（即副作用操作）

2. 没有状态（No State）

3. 所有数据都由 Props 提供

4. 不使用任何 Redux 的 APIs

下面是一个展示组件的示例：

```react
const Button = props => (
  <button type="button">{props.text}</button>
)
```

> 提示：因为不含有状态，展示组件又称为"纯组件"，即它跟纯函数一样，纯粹由参数决定它的值。

**👉 容器组件**

容器组件的特征恰恰相反。

1. 负责管理数据和业务逻辑，不负责 UI 的呈现

2. 带有内部状态

3. 使用 Redux  的 APIs

> **结论：展示组件负责 UI 的呈现，容器组件负责管理数据和逻辑。**

React-Redux 规定，所有的展示组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。

| #                  | 展示组件                   | 容器组件                           |
| ------------------ | -------------------------- | ---------------------------------- |
| **作用**           | 描述如何展现（骨架、样式） | 描述如何运行（数据获取、状态更新） |
| **直接使用 Redux** | 否                         | 是                                 |
| **数据来源**       | props                      | 监听 Redux-state                   |
| **数据修改**       | 从 props 调用回调函数      | 向 Redux 派发 actions              |
| **调用方式**       | 手动                       | 通常由 React-Redux 生成            |

#### connect()

React-Redux 就是一个高阶组件HOC，提供 connect 方法，用于生成容器组件。

使用了 connect，就相当于 store.subscribe， 即组件订阅了 store 中的数据。

```js
import { connect } from 'react-redux'
const ContainerCounter = connect()(Counter);
```

上面代码中，Counter 是展示组件，ContainerCounter 就是由 React-Redux 通过 connect 方法自动生成的容器组件。但是，因为没有定义业务逻辑，上面这个容器组件毫无意义，只是 UI 组件的一个单纯的包装层。为了定义业务逻辑，需要给出下面两方面的信息。

1）输入逻辑：外部的数据（即 State 对象）如何转换为展示组件的参数

2）输出逻辑：用户发出的动作如何变为 Action 对象，从展示组件传出去。

因此，`connect` 方法的完整 API 如下。

```js
import { connect } from 'react-redux'

const ContainerCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
```

上面代码中，`connect` 方法接受两个参数：`mapStateToProps` 和 `mapDispatchToProps`。它们定义了 展示 组件的业务逻辑。前者负责输入逻辑，即将`state`映射到 展示 组件的参数（`props`），后者负责输出逻辑，即将用户对 展示 组件的操作映射成 Action。

#### mapStateToProps()

该函数处理数据的流入，返回一个对象， 使用 connect 函数，传入 mapStateToProps，完成 store 数据与组件的 props 绑定。

```js
const mapStateToProps = (state: RootState) => ({
    count: state.counter.count
});
```

在展示组件中可通过 `this.props.count` 访问。

#### mapDispatchToProps()

该函数处理数据的流出，返回一个对象，对象中的每一个字段都是一个 dispatch 处理函数，使用 connect 函数，传入 mapDispatchToProps，完成 dispatch 与组件的 props 绑定。

```js
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
});
```

在展示组件中可通过 `this.props.increment()` 访问，其内部逻辑本质上就是在 dispatch 一个 action。

#### Provider

React-Redux 利用上下文 Context，提供的数据组件 Provider，使用Provider，加载数据仓库 store 即可在全局范围内使用 store。

```react
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// → React-Redux 利用上下文 Context，提供的数据组件 Provider
import { Provider } from 'react-redux';
import store from './stores';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* 使用Provider，加载数据仓库 store 即可在全局范围内使用 store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

> **Tips：**\<Provider> 的实现原理是基于 **React-Context** 实现的。

`React-Redux` 自动生成的容器组件的代码，就类似上面这样，从而拿到`store`。

### 代码示例

需求描述：这里我们将 **Use-in-js** 里面的代码通过 React-Class 实现一遍。

#### 1. 创建Project

```shell
$ npm create vite@latest use-in-react-class  -- --template react-ts
$ cd use-in-react-class && npm install react-redux redux && code .
```

目录结构：

```
.
├── /src  
	  ├──	/components → 视图组件
	      ├── Counter.css
	  	  └──	Counter.tsx
	  ├──	/stores  
	  		├── /middlewares → 中间件
    				└── index.ts
    		├── /reducers
    				├── counterReducer.ts
    				├── index.ts → 合并Reducers
    				└── statusReducer.ts
	  	  └──	index.ts → 创建Store实例
	  ├──	App.tsx
	  ├──	main.tsx → 引入Store实例
├── ....
```

#### 2. 创建Middlewares

**`/stores/middlewares/index.ts`**

```typescript
import { Middleware } from 'redux';
export const asyncMiddleware: Middleware = (storeApi) => (next) => (action) => {
  if (typeof action === 'function') {
    // → 如果传入的action是一个函数
    // → 调用该函数并传入 dispatch 和 getState 作为参数
    return action(storeApi.dispatch, storeApi.getState);
  } else {
    // → 否则，它就是一个普通 action，那就继续执行
    return next(action);
  }
};
```

#### 3. 创建Reducers

**`counterReducer`**

```typescript
import { ActionCreator } from 'redux';
import { AppDispatch, RootState } from '..';
import { statusToggle } from './statusReducer';

// -- Define Actions
// 👉 用常量定义Action.type，减少代码敲错
const COUNTER_INCREMENT = 'counter/increment';
const COUNTER_DECREMENT = 'counter/decrement';
const COUNTER_INCREMENT_BY_AMOUNT = 'counter/incrementByAmount';

// 👉 Action 类型声明
type CounterIncrementAction = { type: typeof COUNTER_INCREMENT };
type CounterDecrementAction = { type: typeof COUNTER_DECREMENT };
type CounterIncrementByAmountAction = { type: typeof COUNTER_INCREMENT_BY_AMOUNT; payload: number };
type CounterAction = CounterIncrementAction | CounterDecrementAction | CounterIncrementByAmountAction;

// 👉 工厂模式 → 创建 Action
export const increment: ActionCreator<CounterIncrementAction> = () => ({
  type: COUNTER_INCREMENT,
});
export const decrement: ActionCreator<CounterDecrementAction> = () => ({
  type: COUNTER_DECREMENT,
});
export const incrementByAmount: ActionCreator<CounterIncrementByAmountAction> = (amount: number) => ({
  type: COUNTER_INCREMENT_BY_AMOUNT,
  payload: amount,
});

// 👉 initialState
interface CounterState {
  count: number;
}
const initialState: CounterState = { count: 0 };

// 👉 Define Reducer
const counterReducer = (
  state = initialState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case COUNTER_INCREMENT:
      return { ...state, count: state.count + 1 };
    case COUNTER_DECREMENT:
      return { ...state, count: state.count - 1 };
    case COUNTER_INCREMENT_BY_AMOUNT:
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
};

// 👉 CHUNKs - 异步函数
export const incrementAsync = (amount: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const isLoading = getState().status.loading;
    if (isLoading) {
      console.log('当前正在执行异步操作，请稍后再试...');
      return;
    }
    dispatch(statusToggle());
    await new Promise((resolve) => {
      console.log('Loading...');
      setTimeout(() => {
        resolve(null);
      }, 1000);
    });
    dispatch(statusToggle());
    dispatch(incrementByAmount(amount));
    console.log('Completed!');
  };
};

export default counterReducer;
```

**`statusReducer.ts`**

```typescript
import { ActionCreator } from 'redux';

// -- Define Actions
// 1. 用常量定义Action.type，减少代码敲错
const STATUS_TOGGLE = 'status/toggle';

// 2. Action 类型声明
type StatusAction = { type: typeof STATUS_TOGGLE };

// 3. 工厂模式 → 创建 Action
export const statusToggle: ActionCreator<StatusAction> = () => ({
  type: STATUS_TOGGLE,
});

// -- initialState
interface StatusState {
  loading: boolean;
}
const initialState: StatusState = {
  loading: false,
};

// -- Define Reducer
const statusReducer = (
  state = initialState,
  action: StatusAction
): StatusState => {
  switch (action.type) {
    case STATUS_TOGGLE:
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
};

export default statusReducer;
```

**👉  合并Reducers**

**`/reducers/index.ts`**

```typescript
import { combineReducers } from 'redux';

import counterReducer from './counterReducer';
import statusReducer from './statusReducer';

export const rootReducer = combineReducers({
  counter: counterReducer,
  status: statusReducer,
});
```

#### 4. 创建Store

**`/store/index.ts`**

```typescript
import { applyMiddleware, createStore } from 'redux';
import { asyncMiddleware } from './middlewares';
import { rootReducer } from './reducers';

const store = createStore(rootReducer, applyMiddleware(asyncMiddleware));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
```

#### 5. 创建Counter-Comps

**`/components/Counter.tsx`**

```tsx
import React, { ChangeEvent, Dispatch } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../stores';
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
} from '../stores/reducers/counterReducer';
import './Counter.css';

// → 处理数据的流入，返回一个对象
// → 使用 connect 函数，传入 mapStateToProps，完成store数据与组件的props绑定
const mapStateToProps = (state: RootState) => ({
  count: state.counter.count,
  loading: state.status.loading,
});

// → 处理数据的流出，返回一个对象，对象中的每一个字段都是一个dispatch处理函数
// → 使用 connect 函数，传入 mapDispatchToProps，完成dispatch与组件的props绑定
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
  incrementByAmount: (amount: number) => dispatch(incrementByAmount(amount)),
  incrementAsync: (amount: number) => dispatch(incrementAsync(amount)),
});

// -- 类型声明
type IProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
type IState = { incrementAmount: string };
class Counter extends React.Component<IProps, IState> {
  // -- constructor
  constructor(props: IProps) {
    super(props);
    this.state = {
      incrementAmount: '5',
    };
  }
  // -- methods
  getAmount = () => Number(this.state.incrementAmount) || 0;
  // -- events
  onIncrement = () => this.props.increment();
  onDecrement = () => this.props.decrement();
  onAddAmount = () => this.props.incrementByAmount(this.getAmount());
  onAddAsync = () => this.props.incrementAsync(this.getAmount());
  onInputChange = ($event: ChangeEvent<HTMLInputElement>) =>
    this.setState({
      incrementAmount: $event.target.value,
    });
  // -- renders
  render(): React.ReactNode {
    return (
      <div className='counter'>
        <div className='row'>
          <button className='button' onClick={this.onIncrement}>+</button>
          <span className='value'>{this.props.count}</span>
          <button className='button' onClick={this.onDecrement}>-</button>
        </div>
        <div className='row'>
          <input
            className='textbox'
            value={this.state.incrementAmount}
            onChange={this.onInputChange}
          />
          <button className='button' onClick={this.onAddAmount}>Add Amount</button>
          <button className='button asyncButton' onClick={this.onAddAsync}>Add Async</button>
        </div>
      </div>
    );
  }
}

// → 生成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

> **TIPs：**Counter 样式直接复制 **Use-in-js** 里的CSS样式即可。

**`App.tsx`**

```tsx
import React from 'react';
import Counter from './components/Counter';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div className='app'>
        <Counter />
      </div>
    );
  }
}

export default App;
```

#### 6. 注入Store

**`main.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// → React-Redux 利用上下文 Context，提供的数据组件 Provider
import { Provider } from 'react-redux';
import store from './stores';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* 使用Provider，加载数据仓库 store 即可在全局范围内使用 store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

## Use-in-React-Hooks

需求描述：这里我们将 **Use-in-React-Class** 里面的代码通过 React-Hooks 实现一遍，本示例大部分代码可以和上一小节的代码复用。

Hooks中，React-Redux 提供了 **`useSelector`** & **`useDispatch`** 钩子函数让后我们可以更方便灵活的去获取State以及Dispatch.

### 1. 创建Project

```shell
$ npm create vite@latest use-in-react-hooks  -- --template react-ts
$ cd use-in-react-hooks && npm install react-redux redux && code .
```

目录结构：

```
.
├── /src  
	  ├──	/components → 视图组件
	      ├── Counter.css
	  	  └──	Counter.tsx
	  ├──	/stores 
    		├── /reducers
    				├── counterReducer.ts
    				├── index.ts → 合并Reducers
    				└── statusReducer.ts
        ├── hooks.ts → useSelector & useDispatch
	  	  └──	index.ts → 创建Store实例
	  ├──	App.tsx
	  ├──	main.tsx → 引入Store实例
├── ....
```

> **提示：**
>
> - 删除了 middlewares 目录，这里我们使用 [redux-thunk >>](https://www.npmjs.com/package/redux-thunk) 来处理中间件。
> - 新增 hooks 文件，封装 useSelector & useDispatch 来读取和更新Store。

### 2. 创建Hooks

**`stores/hooks.ts`**

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '.';

// 👉 推荐在整个应用程序中使用，而不是单纯的使用 useDispatch & useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### 3. 创建Reducers

**提示：** Reducer 相关代码和示例 **Use-in-React-Class** 一致，你可以参照示例目录将其直接复制/粘贴过来使用，这里只列出修改/新增部分代码。

```typescript
// ....
import { AppThunk } from '..';
export const incrementAsync = (amount: number): AppThunk /** 指定返回类型 */ => {
  return async (dispatch, getState) => {
    const isLoading = getState().status.loading;
    if (isLoading) {
      console.log('当前正在执行异步操作，请稍后再试...');
      return;
    }
    dispatch(statusToggle());
    await new Promise((resolve) => {
      console.log('Loading...');
      setTimeout(() => {
        resolve(null);
      }, 1000);
    });
    dispatch(statusToggle());
    dispatch(incrementByAmount(amount));
    console.log('Completed!');
  };
};
// ....
```

### 4. 创建Store

> **提示：** Store 相关代码和示例 **Use-in-React-Class** 一致，你可以参照示例目录将其直接复制/粘贴过来使用，这里只列出修改/新增部分代码。

**`/store/index.ts`**

```typescript
import { AnyAction, applyMiddleware, createStore } from 'redux';
import { rootReducer } from './reducers';
import thunkMiddleware from 'redux-thunk';
import type { ThunkAction, ThunkMiddleware } from 'redux-thunk';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware as ThunkMiddleware) /* 注册中间件*/
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export default store;
```

### 5. 创建Counter-Comps

> **提示：** Counter 样式代码和示例 **Use-in-React-Class** 一致，你可以直接复制/粘贴过来使用，这里只列出 **`Counter.tsx`** 文件代码.

**`/components/Counter.tsx`**

```tsx
import React, { ChangeEvent, memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { decrement, increment, incrementAsync, incrementByAmount } from '../stores/reducers/counterReducer';
import './Counter.css';

const Counter: React.FC = () => {
  // -- state
  const [incrementAmount, setIncrementAmount] = useState('5');
  // -- stores
  const count = useAppSelector((state) => state.counter.count);
  // -- dispatch
  const dispatch = useAppDispatch();
  // -- methods
  const getNumAmount = () => Number(incrementAmount) || 0;
  // -- events
  const onIncrement = () => dispatch(increment());
  const onDecrement = () => dispatch(decrement());
  const onAddAmount = () => dispatch(incrementByAmount(getNumAmount()));
  const onAddAsync = () => dispatch(incrementAsync(getNumAmount()));
  const onInputChange = ($event: ChangeEvent<HTMLInputElement>) => { setIncrementAmount($event.target.value) };
  // -- renders
  return (
    <div className='counter'>
      <div className='row'>
        <button className='button' onClick={onIncrement}>+</button>
        <span className='value'>{count}</span>
        <button className='button' onClick={onDecrement}>-</button>
      </div>
      <div className='row'>
        <input className='textbox' value={incrementAmount} onChange={onInputChange}/>
        <button className='button' onClick={onAddAmount}>Add Amount</button>
        <button className='button asyncButton' onClick={onAddAsync}>Add Async</button>
      </div>
    </div>
  );
};

export default memo(Counter);
```

**`App.tsx`**

```tsx
import React from 'react';
import Counter from './components/Counter';

const App: React.FC = () => (
  <div className='app'>
    <Counter />
  </div>
);

export default App;

```

### 6. 注入Store

> **提示：** 注入Store代码和示例 **Use-in-React-Class** 一致，你可以直接复制/粘贴过来使用.

# 七、Redux-Toolkit（重点）

**👉  [Redux-Toolkit >>](https://cn.redux-toolkit.js.org/)**

现在，迎接审判吧！！！

在前面的示例中，如你所见，Redux 涉及编写一些冗长的代码，例如不可变更新、action types 和 action creators，以及归一化 state。虽然这些模式有充分的存在理由，但是“手动”编写这些代码可能是比较困难的。很多时候用户不确定编写 Redux 逻辑的“正确方法”是什么。这就是为什么 Redux 团队创建了 Redux Toolkit。

Redux Toolkit 包含了对于构建 Redux 应用程序至关重要的包和函数，简化了大多数 Redux 任务，避免了常见错误，使得编写 Redux 应用程序更容易了。因此，**Redux Toolkit 是编写 Redux 应用程序逻辑的标准方式**，在实际应用中，**你应该使用 Redux Toolkit 来编写 Redux 逻辑。**

当你使用 Redux Toolkit 时，到目前为止介绍的所有概念（actions、reducers、store setup、action creators、thunk 等）仍然存在，但是 **Redux Toolkit 提供了更简单的方法来编写代码**。

接下来，我们通过 Redux-Toolkit 将之前的 Counter 案例再实现一遍。

## Examples：Counters



![](./IMGs/redux_counter.gif)

### 1. 创建Project

```shell
$ npm create vite@latest use-in-toolkit  -- --template react-ts 
$ cd use-in-toolkit && npm install @reduxjs/toolkit react-redux && code .
```

项目目录结构如下：

```
.
├── /src  
	  ├──	/components → 自定义组件
	      ├── /counter
            ├── Counter.css
            └──	Counter.tsx
        └── /user
        	  └──	User.tsx
	  ├──	/store      → Redux Store
    		├── /slices → 功能，reducers & actions & chunks...
    				├── counterSlice.ts
        		└──	userSlice.ts
    		├── hooks.ts → 钩子
    		└── index.ts → 组合Reducers/创建Store实例
	  ├──	App.tsx
	  ├──	index.less
	  ├──	main.tsx → Provider-Store
├── ....
```

接下来我们配置一下取别名，毕竟引用路径中出现注入 **`./..`** 的符号我觉得特别扭。

**👉 `vite.config.ts`**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
```

**👉 `tsconfig.json`**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 2. 创建Redux Store

**👉 `@/store/index.ts`**

```typescript
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import couterReducer from '@/stores/slices/couterSlice';
import userReducer from '@/stores/slices/userSlice';

// 👉 自动调用 combineReducers 合并 reducers
const store = configureStore({
  reducer: {
    counter: couterReducer,
    user: userReducer,
  },
});

// 👉 TypeScript：从 store 本身推断出 RootState 和 AppDispatch 类型
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// 👉 定义Chunk类型
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export default store;

```

> 提示：configureStore 方法为我们自动调用并组合（combineReducers） Reducers。

### 3. 创建Redux Slice

**👉 `@/store/slices/counterSlice.ts`**

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '@/stores';

type CounterState = { count: number };

// 👉 initialState
const initialState: CounterState = { count: 0 };

// 👉 Chunks
// → 异步更新Store，你也可以通过 createAsyncThunk 函数创建
export const incrementAsync = (amount: number): AppThunk => {
  return async (dispatch, getState) => {
    await new Promise((resolve) => {
      console.log('Loading...');
      setTimeout(() => {
        resolve(null);
      }, 1000);
    });
    dispatch(incrementByAmount(amount));
    console.log('Completed!');
  };
};

// 👉 Define Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // -- 自动生成Action：{ type: 'counter/increment' }
    increment: (state) => {
      // → Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。
      // → 并不是真正的改变 state 因为它使用了 immer 库
      // → 当 immer 检测到 「draft state」 改变时，会基于这些改变去创建一个新的不可变的 state
      state.count += 1;
    },
    // -- 自动生成Action：{ type: 'counter/decrement' }
    decrement: (state) => {
      state.count -= 1;
    },
    // -- 自动生成Action：{ type: 'counter/incrementByAmount', payload: number }
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
});

// 👉 Selectors
export const selectCount = (state: RootState) => state.counter.count;

// 👉 Export Dispatchs
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 👉 Export Reducer
export default counterSlice.reducer;
```

**👉 `@/store/slices/userSlice`**

```typescript
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/stores';

// 👉 Define some types.
type UserInfos = { name: string; job: string };
type UserState = { loading: boolean; infos: UserInfos };

// 👉 initialState
const initialState: UserState = {
  infos: { name: '', job: '' },
  loading: false,
};

// 👉 Chunks - 异步逻辑
// → 根据ID请求用户信息
export const fetchUserById = createAsyncThunk<
  // → 定义返回值类型
  UserInfos,
  // → 定义参数类型
  string,
  // → 定义 Thunk-Apis 类型，比如 dispatch & getState 返回值类型
  { dispatch: AppDispatch; state: RootState }
>('user/fetchUserById', async (userId, thunkApi) => {
  const { dispatch, getState, requestId, signal, extra } = thunkApi;
  console.log(getState());
  console.log(`USER ID is: ${userId}`);
  // → 模拟请求
  const response = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: '张三', job: '程序猿' });
    }, 1000);
  });
  // → 推断返回值类型
  return response as UserInfos;
});

// 👉 Define Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // -- 自动生成Action：{ type: 'user/updateInfos', payload: UserInfos }
    updateInfos: (state, action: PayloadAction<UserInfos>) => {
      state.infos = action.payload;
    },
  },
  // → 处理异步 thunk dispatch 的每个 action
  extraReducers(builder) {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.infos = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      });
  },
});

// 👉 Selectors
export const selectInfos = (state: RootState) => state.user.infos;
export const selectLoading = (state: RootState) => state.user.loading;

// 👉 Export Dispatchs
export const { updateInfos } = userSlice.actions;

// 👉 Export Reducer
export default userSlice.reducer;
```

### 4. 创建Redux Hooks

**👉 `@/store/hooks.ts`**

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores';

// 👉 推荐在整个应用程序中使用，而不是单纯的使用 useDispatch & useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### 5. 创建React Counters-Comp

> **提示：** **`Counter.css`** 直接复制 **Use-in-js** 里的样式代码即可。

**👉 `@/components/conter/Counter.tsx`**

```tsx
import React, { ChangeEvent, memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { decrement, increment, incrementAsync, incrementByAmount, selectCount } from '@/stores/slices/couterSlice';
import './Counter.css';

const Counter: React.FC = () => {
  // -- state
  const [incrementAmount, setIncrementAmount] = useState('5');
  // -- stores
  const count = useAppSelector(selectCount);
  // -- dispatch
  const dispatch = useAppDispatch();
  // -- methods
  const getNumAmount = () => Number(incrementAmount) || 0;
  // -- events
  const onIncrement = () => dispatch(increment());
  const onDecrement = () => dispatch(decrement());
  const onAddAmount = () => dispatch(incrementByAmount(getNumAmount()));
  const onAddAsync = () => dispatch(incrementAsync(getNumAmount()));
  const onInputChange = ($event: ChangeEvent<HTMLInputElement>) => setIncrementAmount($event.target.value);
  // -- renders
  return (
    <div className='counter'>
      <div className='row'>
        <button className='button' onClick={onIncrement}>+</button>
        <span className='value'>{count}</span>
        <button className='button' onClick={onDecrement}>-</button>
      </div>
      <div className='row'>
        <input
          className='textbox'
          value={incrementAmount}
          onChange={onInputChange}
        />
        <button className='button' onClick={onAddAmount}>Add Amount</button>
        <button className='button asyncButton' onClick={onAddAsync}>Add Async</button>
      </div>
    </div>
  );
};

export default memo(Counter);
```

**👉 `@/components/user/User.tsx`**

```tsx
import { nanoid } from '@reduxjs/toolkit';
import React, { CSSProperties, memo } from 'react';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  fetchUserById,
  selectInfos,
  selectLoading,
} from '@/stores/slices/userSlice';

const User: React.FC = () => {
  // -- styles
  const styles: CSSProperties = {
    textAlign: 'center',
  };
  // -- stores
  const infos = useAppSelector(selectInfos);
  const loading = useAppSelector(selectLoading);
  // -- dispatch
  const dispatch = useAppDispatch();
  // -- renders
  return (
    <div style={styles}>
      <p>{loading ? 'Loading...' : `${infos.name} - ${infos.job}`}</p>
      {/* 这里 “fetchUserById” 的参数被自动推断为 string */}
      {/* 生成随机的ID字符串：nanoid()  */}
      <button onClick={() => dispatch(fetchUserById(nanoid()))}>
        Fetch Infos
      </button>
    </div>
  );
};

export default memo(User);
```

**👉 App.tsx**

```tsx
import React from 'react';
import Counter from '@/components/counter/Counter';
import User from '@/components/user/User';

const App: React.FC = () => (
  <div className='app'>
    <Counter />
    <User />
  </div>
);

export default App;
```

### 6. 注入Store

**👉 main.tsx**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// → React-Redux 利用上下文 Context，提供的数据组件 Provider
import { Provider } from 'react-redux';
import store from './stores';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* 使用Provider，加载数据仓库 store 即可在全局范围内使用 store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

至此，示例代码已编辑完成，运行代码查看效果吧。

## Examples：Todos

Node：v18.17.1

pnpm：v8.7.5

**👉 Todos Intro.**

接下来我们以一个小型的  “待办事项” 应用程序开始。首先弄清楚这个应用程序的初始业务需求：

- UI 应包括三个主要部分：
  - 一个输入框，让用户输入新待办事项的文本
  - 所有现有待办事项的列表
  - 页脚部分，显示未完成的待办事项数量，并显示过滤选项
- 待办事项列表项应该有一个复选框来切换“完成”状态。还应该能够为预定义的颜色列表添加颜色编码的类别标签，并删除待办事项。
- 计数器应该复数活动待办事项的数量：“0 items”、“1 items”、“3 items”等
- 应该有按钮将所有待办事项标记为已完成，并通过删除它们来清除所有已完成的待办事项
- 应该有两种方法可以过滤列表中显示的待办事项：
  - 待办事项可基于 All 、 Active 和 Completed 进行过滤
  - 基于选择一种或多种颜色进行过滤，并显示标签与这些颜色匹配的任何待办事项

稍后将添加更多需求。

### 1. 创建 & 配置

#### 创建项目

首先我们通过 vite 创建一个 react-ts 项目

```shell
$ pnpm create vite todolist --template react-ts
$ cd todolist && pnpm install && code .
```

#### 配置别名

引用模块时，使用 @ 引用，避免 `../..` 影响可读性，这里需要配置一下别名。

① 安装相关依赖

```shell
$ pnpm i @types/node -D
```
② 更新 `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
```

③ 在 `tsconfig.json` 文件中新增如下配置：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

#### 目录结构

```
.
├── /src  
	  ├──	/components → 自定义组件
	      ├── /footer
	  	  		└──	Footer.tsx
        ├── /header
        		└──	Header.tsx
        └──	/todos
        		├── TodoList.tsx
        		└──	TodoListItem.tsx
	  ├──	/constants  → 常量/记录滤色器颜色集合
    		└──	index.ts
	  ├──	/service    → 异步请求
    		└──	index.ts
	  ├──	/store      → Redux Store
    		├── /slices → 功能，reducers & actions & chunks...
        		├── filtersSlice.ts
        		└──	todosSlice.ts
    		├── hooks.ts → 钩子
    		└── index.ts → 组合Reducers/创建Store实例
	  ├──	App.tsx
	  ├──	index.less
	  ├──	main.tsx → Provider-Store
├── ....
```

### 2. 安装依赖

```shell
$ pnpm i @reduxjs/toolkit react-redux redux-logger 
```

```shell
$ pnpm i less @types/redux-logger -D
```

> **提示**：示例使用 less 构建样式，所以这里需要安装 less。

### 3. 创建 Redux Slice













