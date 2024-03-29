# 一、概述

**组件** 是 React 的核心概念之一，组件允许你将 UI 拆分为独立可复用的代码片段，它们是构建用户界面（UI）的基础。

在 React 中，组件分为 **类组件** 和 **函数组件** 两种，而 类组件目前提供了更多的功能，在实际开发中，我主要使用 **函数组件**。

构建组件时的一些注意事项：

- React 中创建的组件遵循 **驼峰命名** 法则，**首字母大写**。
- 每个组件内都必须实现自己的 `render` 方法。
- 组件只能包含一个顶层标签。

> **注意：**本教程以函数组件为主进行讲解。

# 二、函数组件 & 类组件

定义组件最简单的方式就是编写 JavaScript 函数：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

该函数是一个有效的 React 组件，因为它接收唯一带有数据的 props 对象与并返回一个 React 元素。这类组件被称为 **函数组件**，因为它本质上就是 JavaScript 函数。

你同时还可以使用 ES6 的 class 来定义组件：

```react
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

上述两个组件在 React 里是等效的。

# 三、组件渲染

之前，我们遇到的 React 元素都只是 DOM 标签：

```jsx
const element = <div />;
```

不过，React 元素也可以是用户自定义的组件（*比如我们通过Vite创建项目中的APP组件*）：

```react
const element = <Welcome name="Sara" />;
```

当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性以及子组件转换为单个对象传递给组件，这个对象被称之为属性（`props`） 。例如，这段代码会在页面上渲染 “Hello, Sara”：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <Welcome name="Sara" />;
root.render(element)
```

让我们来回顾一下这个例子中发生了什么：

1）我们调用 `root.render()` 函数，并传入 `<Welcome name="Sara" />` 作为参数。

2）React 调用 `Welcome` 组件，并将 `{name: 'Sara'}` 作为 props 传入。

3）`Welcome` 组件将 `<h1>Hello, Sara</h1>` 元素作为返回值。

4）React DOM 将 DOM 高效地更新为 `<h1>Hello, Sara</h1>`。

# 四、组件嵌套

组件可以在其输出中引用其他组件。这就可以让我们用同一组件来抽象出任意层次的细节。按钮，表单，对话框，甚至整个屏幕的内容：在 React 应用程序中，这些通常都会以组件的形式表示。

例如，我们可以创建一个可以多次渲染 `Welcome` 组件的 `App` 组件：

> *`src/components/Welcome/index.tsx`*

```typescript
import React from 'react';

interface IProps {
  name: string;
}
const Welcome: React.FC<IProps> = (props) => {
  return <div>Hello, {props.name} !</div>;
};
export default Welcome;
```

> *`src/App.tsx`*

```jsx
import React from 'react';
import Welcome from './components/Welcome';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Welcome name='张三'/>
      <Welcome name='李四'/>
    </div>
  );
};

export default App;
```

通常来说，每个新的 React 应用程序的顶层组件都是 `App` 组件。但是，如果你将 React 集成到现有的应用程序中，你可能需要使用像 `Button` 这样的小组件，并自下而上地将这类组件逐步应用到视图层的每一处。

> Tips：当一个页面比较复杂时，我们可以根据需求将其进行拆分成各个不同的小组件，这可能是一件繁重的工作，但是，在大型应用中，构建可复用组件库是完全值得的。根据经验来看，如果 UI 中有一部分被多次使用（`Button`，`Panel`，`Avatar`），或者组件本身就足够复杂（`App`，`FeedStory`，`Comment`），那么它就是一个可提取出独立组件的候选项。

# 五、组件样式

组件样式：内联样式、对象样式、选择器样式

> *`src/components/Welcome/index.css`*

```css
@charset "utf-8";

.welcome {
  color: green;
  letter-spacing: 2px;
}
```
> *`src/components/Welcome/index.tsx`*

```react
import React from 'react';
import './index.css'; /** 引入外部样式 */

interface IProps {
  name: string;
}

const Welcome: React.FC<IProps> = (props) => {
  const styles = { color: 'blue', letterSpacing: '2px' };
  return (
    <div>
      {/* 内联样式 */}
      <p style={{ color: 'red', letterSpacing: '2px' }}>Hello, {props.name}</p>
      {/* 对象样式 */}
      <p style={styles}>Hello, {props.name}</p>
      {/* 外部样式 */}
      <p className='welcome'>Hello, {props.name}</p>
    </div>
  );
};
export default Welcome;
```

> 注意：内联样式绑定的是一个对象，所以样式与样式之间使用逗号`,`隔开。

# 六、组件交互

## 父传子：Props

### Props 的只读性

组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。来看下这个 sum 函数

```js
function sum(a, b) {
  return a + b;
}
```

这样的函数被称为 **纯函数**，因为该函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。

相反，下面这个函数则不是纯函数，因为它更改了自己的入参：

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React 非常灵活，但它也有一个严格的规则：

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

当然，应用程序的 UI 是动态的，并会伴随着时间的推移而变化。在后续章节中，我们将介绍一种新的概念，称之为 state。在不违反上述规则的情况下，state 允许 React 组件随用户操作、网络响应或者其他变化而动态更改输出内容。

### 简单示例

> **函数组件**

```tsx
import React from "react";

// -- 定义接收的属性
interface IProps {
  name: string;
  job: string;
}
const Child: React.FC<IProps> = ({ name, job }) => {
  return (
    <div>
      {name} - {job}
    </div>
  );
};
export default Child;
```

```jsx
{/* 通过属性Props传递数据 */}
<Child name='张三' job='程序猿' />
```

> **类组件**

```tsx
import React from "react";

/** 定义接收的属性 */
interface IProps {
  name: string;
  job: string;
}

class Child extends React.Component<IProps> {
  render() {
    return (
      <div>
        {this.props.name} - {this.props.job}
      </div>
    );
  }
}
export default Child;
```

### 插槽

> **函数组件**

```typescript
import React from "react";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const List: React.FC<IProps> = (props) => {
  return <div>{props.children}</div>;
};

export default List;
```

```tsx
<List>
  <p>语文</p>
  <p>数学</p>
  <p>英语</p>
</List>
```

> 类组件

```typescript
import React from 'react';

interface IProps {
  children: React.ReactNode;
}

class List extends React.Component<IProps> {
  render() {
    return <div>{this.props.children}</div>;
  }
}
```

### 属性验证 & 默认值（了解）

> **TypeScript**

无论你使用函数组件还是类组件，都可以使用 TypeScript 约束属性类型，本教程大量使用了 TS 语法，这里不再累述。

> **三方库**

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
// -- 默认值
Child.defaultProps = {
  age: 18,
};
export default Child;
```

## 子传父：Function

原理：父组件在调用子组件的时候，将方法作为子组件的属性传递，在子组件中调用这个方法并将传递的数据作为函数参数从而实现子传父。

> **子组件**

```tsx
import React from 'react';

interface IProps {
  name: string;
  job: string;
  onClick: (msg: string) => void;
}

const Child: React.FC<IProps> = (props) => {
  // -- render
  return (
    <div>
      {/* 接收父组件传递过来的属性 */}
      <p>{props.name} - {props.job}</p>
      {/* 发送消息给父组件 */}
      <button
        type='button'
        onClick={() => {
          props.onClick('Hello, Father!');
        }}
      >
        Send msg to Father
      </button>
    </div>
  );
};

export default Child;
```
> **父组件**
```react
{/* 通过属性Props传递数据 */}
<Child
  name='李鸿耀'
  job='程序猿'
  onClick={(msg) => {
    console.log(msg);
  }}
/>
```





















