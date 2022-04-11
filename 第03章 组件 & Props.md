# 一、概述

组件允许你将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思。你可以[参考详细组件 API](https://zh-hans.reactjs.org/docs/react-component.html)。

组件，从概念上类似于 `JavaScript` 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

- React 中创建的组件遵循 **驼峰命名** 法则，**首字母大写**。
- 每个组件内都必须实现自己的 `render` 方法。
- 组件只能包含一个顶层标签。

# 二、函数组件 & 类组件

定义组件最简单的方式就是编写 JavaScript 函数：

```jsx
const Welcome = (props) => {
  return (
    <div>
      <p>Hello, {props.name}</p>
    </div>
  );
};
export default Welcome;
```

该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

你同时还可以使用 ES6 的 class 来定义组件：

```react
import { Component } from 'react';
class Welcome extends Component {
  render() {
    return (
      <div>
        <p>Hello, {this.props.name}</p>
      </div>
    );
  }
}
export default Welcome;
```

上述两个组件在 React 里是等效的。

# 三、组件渲染

之前，我们遇到的 React 元素都只是 DOM 标签：

```jsx
const element = <div />;
```

不过，React 元素也可以是用户自定义的组件：

```react
const element = <Welcome name="Sara" />;
```

当 React 元素为用户自定义组件时，它会将 `JSX` 所接收的属性以及子组件转换为单个对象传递给组件，这个对象被称之为 `props` 。

例如，这段代码会在页面上渲染 “Hello, Sara”：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(element);
```

让我们来回顾一下这个例子中发生了什么：

1）我们调用 `root.render()` 函数，并传入 `<Welcome name="Sara" />` 作为参数。

2）React 调用 `Welcome` 组件，并将 `{name: 'Sara'}` 作为 props 传入。

3）`Welcome` 组件将 `<h1>Hello, Sara</h1>` 元素作为返回值。

4）React DOM 将 DOM 高效地更新为 `<h1>Hello, Sara</h1>`。

# 四、组件嵌套

组件可以在其输出中引用其他组件。这就可以让我们用同一组件来抽象出任意层次的细节。按钮，表单，对话框，甚至整个屏幕的内容：在 React 应用程序中，这些通常都会以组件的形式表示。

例如，我们可以创建一个可以多次渲染 `Welcome` 组件的 `App` 组件：

```jsx
import Welcome from './components/Welcome';

const App = () => {
  return (
    <div className='App'>
      <Welcome name='成都' />
      <Welcome name='重庆' />
      <Welcome name='贵阳' />
    </div>
  );
};
export default App;
```

通常来说，每个新的 React 应用程序的顶层组件都是 `App` 组件。但是，如果你将 React 集成到现有的应用程序中，你可能需要使用像 `Button` 这样的小组件，并自下而上地将这类组件逐步应用到视图层的每一处。

> Tips：当一个页面比较复杂时，我们可以根据需求将其进行拆分成各个不同的小组件，这可能是一件繁重的工作，但是，在大型应用中，构建可复用组件库是完全值得的。根据经验来看，如果 UI 中有一部分被多次使用（`Button`，`Panel`，`Avatar`），或者组件本身就足够复杂（`App`，`FeedStory`，`Comment`），那么它就是一个可提取出独立组件的候选项。

# 五、组件样式

组件样式：内联样式、对象样式、选择器样式

我们来看有示例：

```css
@charset 'utf-8';

.welcome {
  color: green;
  letter-spacing: 2px;
}
```

```react
// -- 引入外部样式
import './index.css';

const Welcome = (props) => {
  const styleObj = { color: 'blue', letterSpacing: '2px' };
  return (
    <div>
      {/* 内联样式 */}
      <p style={{ color: 'red', letterSpacing: '2px' }}>Hello, {props.name}</p>
      {/* 对象样式 */}
      <p style={styleObj}>Hello, {props.name}</p>
      {/* 外部样式 */}
      <p className='welcome'>Hello, {props.name}</p>
    </div>
  );
};
export default Welcome;
```

> 注意：内联样式绑定的是一个对象，所以样式与样式之间使用逗号`,`隔开。

# 六、组件交互

## 1. 父传子：Props

### 1.1. Props 的只读性

组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。来看下这个 sum 函数

```js
function sum(a, b) {
  return a + b;
}
```

这样的函数被称为 <u>纯函数</u>，因为该函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。

相反，下面这个函数则不是纯函数，因为它更改了自己的入参：

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React 非常灵活，但它也有一个严格的规则：

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

当然，应用程序的 UI 是动态的，并会伴随着时间的推移而变化。在后续章节中，我们将介绍一种新的概念，称之为 “state”。在不违反上述规则的情况下，state 允许 React 组件随用户操作、网络响应或者其他变化而动态更改输出内容。

### 1.2. 简单示例

```jsx
import { Component } from 'react';

class Child extends Component {
  // -- render
  render() {
    return (
      <div className='page'>
        {this.props.name} - {this.props.job}
      </div>
    );
  }
}

export default Child;
```

```jsx
<Child name='Li-HONGYAO' job='Web Front-end Engineer' />
```

页面输出：“Li-HONGYAO - Web Front-end Engineer”

### 1.3. 插槽

`this.props.children`：表示组件的所有子节点，类似于Vue中的插槽。

示例需求：定义一个列表组件，列表项中显示的内容，以及列表项的数量都由外部决定。

```jsx
import { Component, Children } from 'react';
class List extends Component {
  render() {
    return (
      <ul className='list'>
        {
          /* 列表项数量以及内容不确定，在创建模板时才能确定
             利用this.props.children从父组件获取需要展示的列表项内容
             获取到列表项内容后，需要遍历children，逐项进行设置
             使用React.Children.map() 方法
             返回值：数组对象，这里数组中的元素是<li> */
          Children.map(this.props.children, (child) => {
            return <li>{child}</li>;
          })
        }
      </ul>
    );
  }
}
export default List;
```

```jsx
<List>
  <p>姜子牙</p>
  <p>哪吒</p>
</List>
```

### 1.4. 属性验证

依赖包：<https://www.npmjs.com/package/prop-types>

Steps 1：安装依赖

```shell
$ npm install prop-types
```

Steps 2：引入

```jsx
import propTypes from 'prop-types';
```

Steps 3：使用

```jsx
import { Component } from 'react';
import PropTypes from 'prop-types';

class Child extends Component {
  // -- render
  render() {
    return (
      <div className='page'>
        {this.props.name} - {this.props.job}
      </div>
    );
  }
}

// -- 属性验证
Child.propTypes = {
  // → 字符串
  name: PropTypes.string,
  // → 字符串 或 数值
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // → 字符串 且 必填
  job: PropTypes.string.isRequired,
  // → 指定类型中的一个
  type: PropTypes.oneOf(['手机号', '用户', '邮箱']),
};
export default Child;
```

### 1.5. 属性默认值

```jsx
Child.defaultProps = {
  age: 18,
};
```



## 2. 子传父：methods

原理：父组件在调用子组件的时候，将方法作为子组件的属性传递，在子组件中调用这个方法并将传递的数据作为函数参数从而实现子传父。

```react
// 子组件
<button
  type='button'
  onClick={() => {
    this.props.tap('天道酬勤');
  }}
>
  发送消息给父组件
</button>
```

```react
// 父组件
<Child
  name='Li-HONGYAO'
  job='Web Front-end Engineer'
  tap={(args) => {
    console.log('接收到子组件传递的数据：', args);
  }}
/>
```

点击子组件中的按钮，控制台输出：“接收到子组件传递的数据： 天道酬勤”





















