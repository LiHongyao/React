# 一、概述

我们知道，通过 `props` 可以实现数据的传递，但是有一个问题，那就是如果我们需要动态更新数据，就不能通过 `props` 了，因为 react 中的 `props` 显示在页面上后，并不能动态响应，此时，我们就需要通过状态（`State`）来实现，状态与属性十分相似，**但是状态是私有的，完全受控于当前组件**。我们来看一组关于定时器更新当前时间的示例。

# 二、示例

> Tips：这里，我们通过 `class` 组件实现该需求。

1）定义组件

```react
import { Component } from 'react';

class LocaleTime extends Component {
  // -- 构造函数
  constructor(props) {
    super(props);
    // init state
    this.state = {
      date: new Date(),
    };
  }
  // -- 生命周期
  componentDidMount() {
    // init timer & update state
    this.timer = setInterval(() => {
      this.setState({
        date: new Date(),
      });
    }, 1000);
  }
  componentWillUnmount() {
    // clear timer
    clearInterval(this.timer);
  }
  render() {
    return <h1>北京时间：{this.state.date.toLocaleTimeString()}</h1>;
  }
}

export default LocaleTime;
```

2）导入引用

```jsx
import LocaleTime from './components/LocaleTime';
const App = () => {
  return (
    <div className='App'>
      <LocaleTime />
    </div>
  );
};

export default App;
```



3）效果演示

![](IMGS/state.gif)

4）分析结果

现在时钟每秒钟都会执行。让我们快速回顾一下发生了什么以及调用方法的顺序：

1. 当 `<LocaleTime />` 被引用时，React 会调用 `LocaleTime ` 组件的构造函数。因为 `LocaleTime ` 需要显示当前的时间，所以它会用一个包含当前时间的对象来初始化 `this.state`。我们会在之后更新 state。
2. 之后 React 会调用组件的 `render()` 方法。这就是 React 确定该在页面上展示什么的方式。然后 React 更新 DOM 来匹配 `LocaleTime ` 渲染的输出。
3. 当 `LocaleTime ` 的输出被插入到 DOM 中后，React 就会调用 `ComponentDidMount()` 生命周期方法。在这个方法中，`LocaleTime ` 组件向浏览器请求设置一个计时器来每秒更新一次当前组件的状态 `this.setState`。
4. 通过调用 `setState()` ，React 知道状态已经改变，并再次调用 `render()` 方法来确定屏幕上应当显示什么。 这一次，`render()` 方法中的 `this.state.date` 将不同，所以渲染输出将包含更新的时间，并相应地更新DOM。
5. 一旦`LocaleTime`组件被从DOM中移除，React会调用`componentWillUnmount()`这个钩子函数，定时器也就会被清除。

# 三、注意 *

## 1. 不要直接更新状态

例如，此代码不会重新渲染组件：

```js
// Wrong
this.state.comment = 'Hello';
```

应当使用 `setState()`：

```js
// Correct
this.setState({comment: 'Hello'});
```

> 提示：构造函数是唯一可以给 `this.state` 赋值的地方。

## 2. 状态更新可能是异步的

出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。

因为 `this.props` 和 `this.state` 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

例如，此代码可能会无法更新计数器：

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

要解决这个问题，可以让 `setState()` 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

```js
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

## 3. State 的更新会被合并

当你调用 `setState()` 的时候，React 会把你提供的对象合并到当前的 state。

例如，你的 state 包含几个独立的变量：

```js
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}
```

然后你可以分别调用 `setState()` 来单独地更新它们：

```js
componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```

这里的合并是浅合并，所以 `this.setState({comments})` 完整保留了 `this.state.posts`， 但是完全替换了 `this.state.comments`。

# 四、数据自顶向下流动

不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 `class` 组件。

这就是为什么称 `state` 为局部的或是封装的的原因。除了拥有并设置了它的组件，其他组件都无法访问。

组件可以选择把它的 `state` 作为 `props` 向下传递到它的子组件中：

```html
<FormattedDate date={this.state.date} />
```

`FormattedDate` 组件会在其 `props` 中接收参数 `date`，但是组件本身无法知道它是来自于 `LocaleTime ` 的 `state`，或是 `LocaleTime ` 的 `props`，还是手动输入的：

```react
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

这通常会被叫做 “**自上而下**” 或是 “**单向**” 的数据流。任何的 `state` 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。

如果你把一个以组件构成的树想象成一个 `props` 的数据瀑布的话，那么每一个组件的 `state` 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。

为了证明每个组件都是真正独立的，我们可以创建一个渲染三个 `LocaleTime` 的 `App` 组件：

```html
import LocaleTime from './components/LocaleTime';
const App = () => {
  return (
    <div className='App'>
      <LocaleTime />
      <LocaleTime />
      <LocaleTime />
    </div>
  );
};

export default App;
```

每个 `LocaleTime` 组件都会单独设置它自己的计时器并且更新它。

在 React 应用中，组件是有状态组件还是无状态组件属于组件实现的细节，它可能会随着时间的推移而改变。你可以在有状态的组件中使用无状态的组件，反之亦然。

