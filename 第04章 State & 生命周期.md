https://doc.react-china.org/docs/state-and-lifecycle.html

# # 概述

我们知道，通过 props 可以实现数据的传递，但是有一个问题，那就是如果我们需要动态更新数据，就不能通过 props 了，因为 react 中的 props 显示在页面上后，并不能动态响应，此时，我们就需要通过状态（State）来实现了，状态与属性十分相似，但是状态是私有的，完全受控于当前组件。我们来看一组关于定时器更新当前时间的示例。

# # 示例

**\> 定义 LocaleTime 组件**

```react

import React, {Component} from 'react';

// 导出一个显示时间的组件
export default class LocaleTime extends Component {
    // 1. 构造器
    constructor(props) {
        // 在ES6中，子类的constructor中必须先调用super才能引用this
        super(props);
        // 初始化state
        this.state = {
            date: new Date()
        }
    }
    // 2. 渲染函数
    render() {
        return (
            <h1>北京时间：{this.state.date.toLocaleTimeString()}</h1>
        );
    }

    // 3. 生命周期 -> 组件挂载完成
    componentDidMount() {
        // 初始化定时器，并将该定时器绑定在组件实例上
        this.timer = setInterval(() => {
            // 更新state值
            this.setState({
                date: new Date()
            });
        }, 1000)
    }
    // 4. 生命周期 -> 组件即将卸载
    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.timer);
    }
}
```

**\> 使用 LocaleTime 组件**

```react
import React from 'react';
import ReactDOM from 'react-dom';
import LocaleTime from './locale-time';

ReactDOM.render(
    <LocaleTime />,
    document.getElementById('root')
);
```

**\> 效果演示**

![](IMGS/state.gif)

**\> 分析**

现在时钟每秒钟都会执行。让我们快速回顾一下发生了什么以及调用方法的顺序：

1. 当 `<LocaleTime />` 被传递给 `ReactDOM.render()` 时，React 调用 `LocaleTime` 组件的构造函数。 由于 `LocaleTime` 需要显示当前时间，所以使用包含当前时间的对象来初始化 `this.state` 。 我们稍后会更新此状态。
2. React 然后调用 `LocaleTime` 组件的 `render()` 方法。这是 React 了解屏幕上应该显示什么内容，然后 React 更新 DOM 以匹配 `LocaleTime` 的渲染输出。
3. 当 `LocaleTime` 的输出插入到 DOM 中时，React 调用 `componentDidMount()` 生命周期钩子。 在其中，`LocaleTime` 组件要求浏览器设置一个定时器，每秒钟调用一次更新一次当前时间。
4. 浏览器每秒钟更新一次当前时间。 在其中，`LocaleTime` 组件通过使用包含当前时间的对象调用 `setState()` 来调度UI更新。 通过调用 `setState()` ，React 知道状态已经改变，并再次调用 `render()` 方法来确定屏幕上应当显示什么。 这一次，`render()` 方法中的 `this.state.date` 将不同，所以渲染输出将包含更新的时间，并相应地更新DOM。
5. 一旦`LocaleTime`组件被从DOM中移除，React会调用`componentWillUnmount()`这个钩子函数，定时器也就会被清除。

# # 正确使用状态

## 1、不要直接更新状态

例如，此代码不会重新渲染组件：

```js
// Wrong
this.state.message = 'Hello';
```

应当使用 `setState()`：

```js
// Correct
this.setState({message: 'Hello'});
```

> 提示：构造函数是唯一能够初始化 `this.state` 的地方。

## 2、状态更新可能是异步的

React 可以将多个`setState()` 调用合并成一个调用来提高性能。

因为 `this.props` 和 `this.state` 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。

例如，此代码可能无法更新计数器：

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

要修复它，请使用第二种形式的 `setState()` 来接受一个函数而不是一个对象。 该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数：

```js
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

## 3、状态合并更新

当你调用 `setState()` 时，React 将你提供的对象合并到当前状态。

例如，你的状态可能包含一些独立的变量：

```js
constructor(props) {
    super(props);
    this.state = {
        posts: [],
        comments: []
    };
}
```

你可以调用 `setState()` 独立地更新它们：

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

这里的合并是浅合并，也就是说`this.setState({comments})`完整保留了`this.state.posts`，但完全替换了`this.state.comments`。

# # 数据自顶向下流动

父组件或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心某组件是被定义为一个函数还是一个类。

这就是为什么状态通常被称为局部或封装。 除了拥有并设置它的组件外，其它组件不可访问。

组件可以选择将其状态作为属性传递给其子组件：

```html
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

这也适用于用户定义的组件：

```
<FormattedDate date={this.state.date} />
```

`FormattedDate` 组件将在其属性中接收到 `date` 值，并且不知道它是来自 `LocaleTime` 状态、还是来自 `LocaleTime` 的属性、亦或手工输入：

```html
function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

这通常被称为`自顶向下`或`单向`数据流。 任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中`下方`的组件。

如果你想象一个组件树作为属性的瀑布，每个组件的状态就像一个额外的水源，它连接在一个任意点，但也流下来。

为了表明所有组件都是真正隔离的，我们可以创建一个 `App` 组件，它渲染三个`LocaleTime`：

```html
function App() {
  return (
    <div>
      <LocaleTime />
      <LocaleTime />
      <LocaleTime />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

每个 `LocaleTime` 建立自己的定时器并且独立更新。

在 React 应用程序中，组件是有状态还是无状态被认为是可能随时间而变化的组件的实现细节。 可以在有状态组件中使用无状态组件，反之亦然。